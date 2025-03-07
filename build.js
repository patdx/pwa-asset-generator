import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['src/main.ts', 'src/cli.ts'],
  bundle: true,
  outdir: 'dist',
  platform: 'node',
  target: 'node22',
  format: 'esm',
  packages: 'external',
  splitting: true,
})
