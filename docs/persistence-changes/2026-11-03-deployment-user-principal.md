---
description: "Records a persistence type transition and its compatibility acknowledgement."
kind: persistence-change
---

# 2026-11-03-deployment-user-principal

English | [中文](2026-11-03-deployment-user-principal.zh.md)

## Summary

Adds a deployment-user principal carrying a configured user id to the optional caller attribution on user messages.

## Table of Contents

- [Declaration](#declaration)
- [Compatibility](#compatibility)
- [Verification](#verification)
- [Dev Note](#dev-note)

<a id="declaration"></a>
## Declaration

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
## Compatibility

Existing owner and share-viewer messages remain unchanged. The new principal is optional metadata on the existing user source kind, contains no credential, and does not become an authorization grant when a log is read. Readers without this identity provider preserve the ordinary user message and its attribution; access decisions still use the current authenticated Peer and configured Workspace grants. Current readers continue to accept older messages without principal. The user deployment is opt-in and requires the identity provider at the connection layer; absence never restores owner authentication in provider mode. SESSION_FORMAT_VERSION is unchanged.

<a id="verification"></a>
## Verification

62 focused tests passed across client-connection node-half, Session remote access, Workspace controller and frontend-static. The Session access test now covers deployment-user attribution in durable Inbox splice events alongside unchanged owner sources. The separate single-process integration exercised persistent browser credentials and Session identity after a real Host restart without model calls. Full Docker sandbox verification is not included.

<a id="dev-note"></a>
## Dev Note

None.
