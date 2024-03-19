#!/usr/bin/env zx

await fs.rm('dist', { recursive: true, force: true })

await $`tstl`

const indexFiles = await globby('dist/lua/**/index.lua')
indexFiles.forEach((f) => {
  fs.renameSync(f, f.replace('index.lua', 'init.lua'))
})

const init = fs.readFileSync('src/init.lua').toString()
fs.writeFileSync('dist/init.lua', init)

const plugins = await globby('dist/lua/plugins/*.lua');

plugins.forEach((p) => {
  const content = fs.readFileSync(p).toString()
  fs.writeFileSync(
    p,
    content.replace(
      '____exports.default',
      '____exports'
    )
  )
})
