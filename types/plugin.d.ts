declare type MaybeArray<T> = T | Array<T>

/** @noSelf **/
declare interface PluginConf {
  disable?: boolean // Mark a plugin as inactive
  as?: string // Specifies an alias under which to install the plugin
  installer?: Function // Specifies custom installer. See "custom installers" below.
  updater?: Function // Specifies custom updater. See "custom installers" below.
  after?: MaybeArray<string> // Specifies plugins to load before this plugin. See "sequencing" below
  rtp?: string // Specifies a subdirectory of the plugin to add to runtimepath.
  opt?: boolean // Manually marks a plugin as optional.
  branch?: string // Specifies a git branch to use
  tag?: string // Specifies a git tag to use
  commit?: string // Specifies a git commit to use
  lock?: boolean // Skip updating this plugin in updates/syncs. Still cleans.
  run?: string | Function | Record<any, any> // Post-update/install hook. See "update/install hooks".
  requires?: MaybeArray<string> // Specifies plugin dependencies. See "dependencies".
  rocks?: MaybeArray<string> // Specifies Luarocks dependencies for the plugin
  config?: string | Function // Specifies code to run after this plugin is loaded.
  // The setup key implies opt : true
  setup?: string | Function // Specifies code to run before this plugin is loaded.
  // The following keys all imply lazy-loading and imply opt : true
  cmd?: MaybeArray<string> // Specifies commands which load this plugin. Can be an autocmd pattern.
  ft?: MaybeArray<string> // Specifies filetypes which load this plugin.
  keys?: MaybeArray<string> // Specifies maps which load this plugin. See "Keybindings".
  event?: MaybeArray<string> // Specifies autocommand events which load this plugin.
  fn?: MaybeArray<string> // Specifies functions which load this plugin.
  cond?: MaybeArray<string | Function> // Specifies a conditional test to load this plugin
  module?: MaybeArray<string> // Specifies Lua module names for require. When requiring a string which starts
  // with one of these module names, the plugin will be loaded.
  module_pattern?: MaybeArray<string> // Specifies Lua pattern of Lua module names for require. When requiring a string which matches one of these patterns, the plugin will be loaded.
}

declare type Plugin = PluginConf & {
  1: string
}
