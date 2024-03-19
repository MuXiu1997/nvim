type LazyKeysSpec = unknown

interface LazySpec {
  /** Short plugin url. Will be expanded using `config.git.url_format` */
  1?: string
  /** A directory pointing to a local plugin */
  dir?: string
  /** A custom git url where the plugin is hosted */
  url?: string
  /** A custom name for the plugin used for the local plugin directory and as the display name */
  name?: string
  /** When `true`, a local plugin directory will be used instead. See `config.dev` */
  dev?: boolean
  /** When `true`, the plugin will only be loaded when needed. Lazy-loaded plugins are automatically loaded when their Lua modules are `required`, or when one of the lazy-loading handlers triggers */
  lazy?: boolean
  /** When `false`, or if the `function` returns false, then this plugin will not be included in the spec */
  enabled?: boolean | (() => boolean)
  /** When `false`, or if the `function` returns false, then this plugin will not be loaded. Useful to disable some plugins in vscode, or firenvim for example. */
  cond?: boolean | ((LazyPlugin: any) => boolean)
  /** A list of plugin names or plugin specs that should be loaded when the plugin loads. Dependencies are always lazy-loaded unless specified otherwise. When specifying a name, make sure the plugin spec has been defined somewhere else. */
  dependencies?: LazySpec[]
  /** `init` functions are always executed during startup */
  init?: (LazyPlugin: any) => void
  /** `opts` should be a table (will be merged with parent specs), return a table (replaces parent specs) or should change a table. The table will be passed to the `Plugin.config()` function. Setting this value will imply `Plugin.config()` */
  opts?: object | ((LazyPlugin: any, opts: object) => object)
  /** `config` is executed when the plugin loads. The default implementation will automatically run `require(MAIN).setup(opts)`. Lazy uses several heuristics to determine the plugin's `MAIN` module automatically based on the plugin's **name**. See also `opts`. To use the default implementation without `opts` set `config` to `true`. */
  config?: ((LazyPlugin: any, opts: object) => void) | true
  /** You can specify the `main` module to use for `config()` and `opts()`, in case it can not be determined automatically. See `config()` */
  main?: string
  /** `build` is executed when a plugin is installed or updated. Before running `build`, a plugin is first loaded. If it's a string it will be ran as a shell command. When prefixed with `:` it is a Neovim command. You can also specify a list to executed multiple build commands. Some plugins provide their own `build.lua` which is automatically used by lazy. So no need to specify a build step for those plugins. */
  build?: ((LazyPlugin: any) => void) | string | string[]
  /** Branch of the repository */
  branch?: string
  /** Tag of the repository */
  tag?: string
  /** Commit of the repository */
  commit?: string
  /** Version to use from the repository. Full [Semver](https://devhints.io/semver) ranges are supported */
  version?: string | false
  /** When `true`, this plugin will not be included in updates */
  pin?: boolean
  /** When false, git submodules will not be fetched. Defaults to `true` */
  submodules?: boolean
  /** Lazy-load on event. Events can be specified as `BufEnter` or with a pattern like `BufEnter *.lua` */
  event?:
    | string
    | string[]
    | ((self: any, event: string[]) => string[])
    | { event: string[] | string; pattern?: string[] | string }
  /** Lazy-load on command */
  cmd?: string | string[] | ((self: any, cmd: string[]) => string[])
  /** Lazy-load on filetype */
  ft?: string | string[] | ((self: any, ft: string[]) => string[])
  /** Lazy-load on key mapping */
  keys?: string | string[] | LazyKeysSpec[] | ((self: any, keys: string[]) => (string | LazyKeysSpec)[])
  /** Do not automatically load this Lua module when it's required somewhere */
  module?: false
  /** Only useful for **start** plugins (`lazy=false`) to force loading certain plugins first. Default priority is `50`. It's recommended to set this to a high number for colorschemes. */
  priority?: number
  /** When a spec is tagged optional, it will only be included in the final spec, when the same plugin has been specified at least once somewhere else without `optional`. This is mainly useful for Neovim distros, to allow setting options on plugins that may/may not be part of the user's plugins */
  optional?: boolean
}

/** @noSelf **/
declare interface Setupable<O extends Array<any> = any> {
  setup: (...opts: O) => void
}
