import { AsyncLocalStorage } from "node:async_hooks";

// TODO(temp): remove this file (and its setupFiles entry in vitest.workerd.config.ts)
// once @cloudflare/vitest-plugin ships the fix from cloudflare/workers-sdk#16699
// (no-op ALS#disable in the test runtime; tracked by release PR #16729).
// Needed because: vitest >=5.1.0's vi.mock calls ALS.disable(), which workerd
// intentionally throws on. Library runtime code is unaffected — tests only.
(AsyncLocalStorage.prototype as any).disable = function () {};
