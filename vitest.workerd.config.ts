import { cloudflareTest } from "@cloudflare/vitest-plugin";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    cloudflareTest({
      miniflare: {
        compatibilityDate: "2026-01-20",
        compatibilityFlags: ["nodejs_compat"],
      },
    }),
  ],
  test: {
    setupFiles: ["./test/workerd-setup.ts"],
  },
});
