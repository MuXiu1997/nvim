/** @noSelfInFile **/

import global from '../core/global'
import * as path from '../lib/path'
import { defineModule, registerModule } from '../lib/plugin'
import { arrayForEach, arrayMap } from '../lib/util'

import type { Module } from '../lib/plugin'

let packer: Packer

function requirePacker() {
  return typeRequire<Packer>('packer')
}

function ensurePlugins() {
  const packerInstallPath = path.join(
    global.sitePath,
    'pack',
    'packer',
    'opt',
    'packer.nvim'
  )
  const packerNotInstalled = vim.fn.empty(vim.fn.glob(packerInstallPath)) === 1
  if (packerNotInstalled) {
    vim.fn.system([
      'git',
      'clone',
      '--depth',
      '1',
      'https://github.com/wbthomason/packer.nvim',
      packerInstallPath,
    ])
    loadPacker()
    packer.sync()
    return packerNotInstalled
  }
}

function getModules() {
  return arrayMap(__modules, (_, m) => {
    return typeRequire<{ default: Module }>(m).default
  })
}

function loadPacker() {
  if (typeof packer === 'undefined') {
    vim.cmd('packadd packer.nvim')
    packer = requirePacker()
  }
  packer.init({
    compile_path: global.compiledPath,
    auto_reload_compiled: false,
  })
  packer.reset()

  const modules = getModules()
  arrayForEach(modules, (_, m) => {
    registerModule(m, packer.use)
  })
  registerModule(
    defineModule({
      'wbthomason/packer.nvim': { opt: true },
    }),
    packer.use
  )
}

function loadCompiled() {
  if (vim.fn.filereadable(global.compiledPath) === 1) {
    typeRequire('_compiled')
  } else {
    error('Missing packer compiled file')
  }
}

function loadPackerCommands() {
  loadPacker()
  packer.make_commands()
}

vim.cmd(
  `autocmd User PackerCompileDone lua require('core.plugins').loadCompiled()`
)
vim.cmd(
  `command! LoadPackerCommands lua require('core.plugins').loadPackerCommands()`
)

export { ensurePlugins, loadPacker, loadCompiled, loadPackerCommands }
