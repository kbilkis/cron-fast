import { defineWorkersConfig } from "@cloudflare/vitest-pool-workers/config";

export default defineWorkersConfig({
  test: {
    poolOptions: {
      workers: {
        miniflare: {
          compatibilityDate: "2026-01-20",
          compatibilityFlags: ["nodejs_compat"],
        },
      },
    },
  },
});
