---
description: "记录持久化类型更改及其兼容性确认。"
kind: persistence-change
---

# 2026-11-03-deployment-user-principal

[English](2026-11-03-deployment-user-principal.md) | 中文

## 概述

在用户消息可选的调用方归属中增加 deployment-user 身份，仅记录配置中的用户标识。

## 目录

- [声明](#declaration)
- [兼容性](#compatibility)
- [验证](#verification)
- [开发备注](#dev-note)

<a id="declaration"></a>
## 声明

```yaml persistence-change
schemaVersion: 1
id: 2026-11-03-deployment-user-principal
baseline: false
changes:
  - root: "event:agent/inbox/spliced"
    previous: "2026-10-13-liveshare-share-viewer-principal"
    after: "0b97e989ab83ecb853088142ebebe85825842acc1f29d69f2ea5f7a977d397fe"
    decision: same-version
  - root: "event:developer/message"
    previous: "2026-10-13-liveshare-share-viewer-principal"
    after: "0fc5587046c619ed44f72a046706beef938839df9214cae56d4a93f8de8b2045"
    decision: same-version
  - root: "event:session/title-llm-request"
    previous: "2026-10-13-liveshare-share-viewer-principal"
    after: "083b51def3e8ea9555ea413fcdccaceb36ee3bc9827bbb5b6f85cead4f35c7e2"
    decision: same-version
  - root: "event:user/message"
    previous: "2026-10-13-liveshare-share-viewer-principal"
    after: "67c1779d45b17fe72fc013f13fec61dc5b62d3b8dc893f9f5d9ab8452b393e28"
    decision: same-version
```

<a id="compatibility"></a>
## 兼容性

已有 owner 和 share-viewer 消息保持不变。新身份属于既有 user 来源的可选元数据，不包含凭据，读取日志不会将其变为授权。未加载该身份提供方的读取器保留普通用户消息及归属信息；权限判定仍使用当前已认证的 Peer 和配置中的 Workspace 授权。当前读取器继续接受没有 principal 的旧消息。用户部署为显式启用，连接层必须使用身份提供方；provider 模式下缺少提供方不会回退 owner 认证。SESSION_FORMAT_VERSION 不变。

<a id="verification"></a>
## 验证

client-connection node-half、Session remote access、Workspace controller 和 frontend-static 共62项定向测试通过。Session访问测试覆盖 deployment-user 在持久Inbox splice事件中的归属，同时保留owner来源不变。另行执行的单进程集成验证了真实Host重启后的浏览器凭证与Session身份恢复，未调用模型。不包含完整Docker沙箱验证。

<a id="dev-note"></a>
## 开发备注

无。
