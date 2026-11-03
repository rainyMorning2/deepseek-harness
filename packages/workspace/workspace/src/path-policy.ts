/** Optional deployment policy for Workspace and Session directory admission. */
import { Context, Service } from '@deepseek-ai/cordis'

/** A deployment denied a directory before Workspace or Session creation. */
export class WorkspacePathDeniedError extends Error {
  /** @param path - Submitted directory path. */
  constructor(readonly path: string) {
    super('Directory is outside the authorized Workspace roots')
    this.name = 'WorkspacePathDeniedError'
  }
}

declare module '@deepseek-ai/cordis' {
  interface Context {
    workspacePathPolicy: WorkspacePathPolicy
  }
}

/** A deployment provider authorizes paths independently of filesystem execution. */
export abstract class WorkspacePathPolicy extends Service {
  /** @param ctx - Context owning this policy provider. */
  constructor(ctx: Context) {
    super(ctx, 'workspacePathPolicy')
  }

  /**
   * Authorize an existing directory and resolve its canonical Host path.
   * @param path - Untrusted absolute directory spelling.
   * @returns Canonical directory; rejects before use when unauthorized or unavailable.
   */
  abstract resolve(path: string): Promise<string>

  /**
   * Check a canonical stored path without filesystem I/O.
   * @param path - Canonical Workspace path from the registry.
   * @returns Whether the deployment permits this path.
   */
  abstract allows(path: string): boolean

  /**
   * Resolve the deployment's initial directory.
   * @returns An authorized existing directory for first-use initialization.
   */
  abstract defaultDirectory(): Promise<string>
}
