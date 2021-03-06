#!/usr/bin/env zx

await $`tstl`

const indexFiles = await globby('dist/lua/**/index.lua')
indexFiles.forEach((f) => {
  fs.renameSync(f, f.replace('index.lua', 'init.lua'))
})

const modules = (await globby('dist/lua/modules/*.lua')).map(
  (p) => `modules/${path.basename(p).replace('.lua', '')}`
)

const init = fs.readFileSync('src/init.lua').toString()

fs.writeFileSync(
  'dist/init.lua',
  init.replace(
    '_G.__modules = {}',
    `_G.__modules = {${modules.map((m) => `'${m}'`).join(',')}}`
  )
)

fs.writeFileSync(
  'dist/coc-settings.json',
  fs.readFileSync('src/coc-settings.json')
)
