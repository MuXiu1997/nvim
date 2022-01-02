#!/usr/bin/env zx

const nvim = path.join(os.homedir(), '.config', 'nvim')

const files = await globby('dist/**/*')
files.forEach((source) => {
  const target = path.join(nvim, source.slice(5))
  fs.writeFileSync(target, fs.readFileSync(source))
})
