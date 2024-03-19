#!/usr/bin/env zx

const nvim = path.join(os.homedir(), '.config', 'nvim')

await $`mkdir -p ${nvim}`
await $`rsync -av --delete dist/ ${nvim}/`
