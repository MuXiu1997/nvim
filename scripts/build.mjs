#!/usr/bin/env zx

await $`tstl`

const indexFiles = await globby('dist/lua/**/index.lua')
indexFiles.forEach((f)=>{
  fs.renameSync(f,f.replace('index.lua','init.lua'))
})

fs.writeFileSync('dist/init.lua',fs.readFileSync('src/init.lua'))
