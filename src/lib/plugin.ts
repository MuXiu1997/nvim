/** @noSelfInFile **/

import { arrayForEach, recordToArray } from './util'

export type PluginConfigRecord = Record<string, PluginConf>

export interface Module {
  plugins: Array<Plugin>
}

const defineModule = (pluginConfigRecord: PluginConfigRecord) => {
  const module: Module = {
    plugins: recordToArray(pluginConfigRecord, (name, conf) => {
      return vim.tbl_extend('force', { 1: name }, conf) as Plugin
    }),
  }
  return module
}

const registerModule = (module: Module, use: Packer['use']) => {
  arrayForEach(module.plugins, (_, plugin) => {
    use(plugin)
  })
}

export { defineModule, registerModule }
