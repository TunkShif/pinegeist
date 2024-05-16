import { rm } from "node:fs/promises"
import esbuild from "esbuild"

const clean = () => rm("../priv/static", { recursive: true, force: true })

const entries = [
  {
    entryPoints: ["js/pinegeist/index.ts"],
    outfile: "../priv/static/pinegeist.cdn.js",
    globalName: "Pinegeist",
    bundle: true
  },
  {
    entryPoints: ["js/pinegeist/index.ts"],
    outfile: "../priv/static/pinegeist.cdn.min.js",
    globalName: "Pinegeist",
    bundle: true,
    minify: true
  },
  {
    entryPoints: ["js/pinegeist/index.ts"],
    outfile: "../priv/static/pinegeist.cjs.js",
    bundle: true,
    sourcemap: true,
    platform: "node"
  },
  {
    entryPoints: ["js/pinegeist/index.ts"],
    outfile: "../priv/static/pinegeist.esm.js",
    bundle: true,
    sourcemap: true,
    platform: "neutral",
    mainFields: ["main", "module"]
  }
]

await clean()
await Promise.all(entries.map((entry) => esbuild.build(entry))).catch(() => process.exit(1))
