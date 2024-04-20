import esbuild from "esbuild"

const entries = [
  {
    entryPoints: ["js/index.ts"],
    outfile: "dist/cdn.js",
    globalName: "Pinegeist",
    bundle: true
  },
  {
    entryPoints: ["js/index.ts"],
    outfile: "dist/cdn.min.js",
    globalName: "Pinegeist",
    bundle: true,
    minify: true
  },
  {
    entryPoints: ["js/index.ts"],
    outfile: "dist/module.cjs.js",
    bundle: true,
    platform: "node"
  },
  {
    entryPoints: ["js/index.ts"],
    outfile: "dist/module.esm.js",
    bundle: true,
    platform: "neutral",
    mainFields: ["main", "module"]
  }
]

await Promise.all(entries.map((entry) => esbuild.build(entry))).catch(() => process.exit(1))
