import { cloudflareTest } from "@cloudflare/vitest-pool-workers";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    exclude: ["test/cli.test.ts"],
  },
  plugins: [
    cloudflareTest({
      miniflare: {
        compatibilityDate: "2026-01-20",
        compatibilityFlags: ["nodejs_compat"],
      },
    }),
  ],
});
