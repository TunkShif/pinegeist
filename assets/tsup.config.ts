import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["./js/pinegeist/index.js"],
  format: ["cjs", "esm"],
  outDir: "../priv/static/pinegeist/",
  sourcemap: true,
  clean: true
})
