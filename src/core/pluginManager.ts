import { join } from '../lib/path'

const lazypath = join(vim.fn.stdpath('data'), 'lazy', 'lazy.nvim')

if (!vim.loop.fs_stat(lazypath)) {
  vim.fn.system([
    'git',
    'clone',
    '--filter=blob:none',
    'https://github.com/folke/lazy.nvim.git',
    '--branch=stable',
    lazypath,
  ])
}

;(vim.opt.rtp as vimOptList<string>).prepend(lazypath)

typeRequire<Setupable>('lazy').setup('plugins')
