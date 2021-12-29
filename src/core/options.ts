import global from './global'

import { setOptions } from '../lib/option'

setOptions({
  // global
  clipboard: 'unnamedplus',
  history: 1000,
  hlsearch: true,
  ignorecase: true,
  incsearch: true,
  mouse: 'a',
  scrolloff: 5,
  shortmess: 'c',
  showcmd: true,
  showmode: true,
  sidescrolloff: 15,
  smartcase: true,
  updatetime: 100,

  // buffer
  expandtab: true,
  shiftwidth: 4,
  syntax: 'ON',
  tabstop: 4,

  // window
  cursorline: true,
  list: true,
  listchars: 'tab:--,trail:.',
  number: true,
  relativenumber: true,
  wrap: false,
})

if (global.isMac) {
  vim.g.clipboard = {
    name: 'macOS-clipboard',
    copy: {
      '+': 'pbcopy',
      '*': 'pbcopy',
    },
    paste: {
      '+': 'pbpaste',
      '*': 'pbpaste',
    },
    cache_enabled: 0,
  }
}
