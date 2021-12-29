/** @noSelfInFile **/

import global from '../core/global'
import * as path from '../lib/path'
import { defineModule, registerModule } from '../lib/plugin'
import { arrayForEach, arrayMap } from '../lib/util'

import type { Module } from '../lib/plugin'

let packer: Packer

function requirePacker() {
  return require<typeof packer>('packer')
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
  const modulePaths = vim.split(
    vim.fn.globpath(global.modulesPath, '*.lua'),
    '\n'
  )
  return arrayMap(modulePaths, (i, p) => {
    const moduleName = string.sub(p, global.modulesPath.length + 2, -5)
    return require<{ default: Module }>(`modules/${moduleName}`).default
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
    require('_compiled')
  } else {
    error('Missing packer compiled file')
  }
}

vim.cmd(
  `autocmd User PackerCompileDone lua require('core.plugins').loadCompiled()`
)
vim.cmd(
  `command! LoadPackerCommands lua require('core.plugins').loadPacker();require('packer').make_commands()`
)

export { ensurePlugins, loadPacker, loadCompiled }
