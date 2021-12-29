import * as path from '../lib/path'

const osName = vim.loop.os_uname().sysname
const configPath = vim.fn.stdpath('config')
const dataPath = vim.fn.stdpath('data')
const sitePath = path.join(dataPath, 'site')

const global = {
  isMac: osName === 'Darwin',
  isLinux: osName === 'Linux',
  isWindows: osName === 'Windows',
  configPath,
  modulesPath: path.join(configPath, 'lua', 'modules'),
  dataPath,
  sitePath,
  compiledPath: path.join(sitePath, 'lua', '_compiled.lua'),
}

export default global
