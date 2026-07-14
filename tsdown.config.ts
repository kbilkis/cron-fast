import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts", "src/cli.ts"],
  format: ["cjs", "esm"],
  dts: { entry: ["src/index.ts"] },
  sourcemap: true,
  clean: true,
  minify: true,
  treeshake: true,
  target: false,
});
