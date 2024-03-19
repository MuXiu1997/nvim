/** @noSelf **/
declare interface Vim {
  api: Api & { [k in string]: (this: void, ...args: any) => any }
  fn: Fn & { [k in string]: (this: void, ...args: any) => any }
  fs: Fs
  loop: Loop

  g: Record<string, unknown>
  b: Record<string, unknown>
  o: Record<string, unknown>

  opt: Record<string, unknown>

  cmd: (cmd: string) => void
  inspect: (o: unknown) => string
  split: (s: string, sep: string, kwargs?: { plain?: boolean; trimempty?: boolean }) => Array<string>
  tbl_extend: (behavior: 'error' | 'keep' | 'force', ...tables: Array<Record<any, any>>) => Record<any, any>
}

interface StdpathMap {
  cache: string
  config: string
  data: string
  config_dirs: Array<string>
  data_dirs: Array<string>
}

type StdpathParams = keyof StdpathMap

/** @noSelf **/
declare interface Fn {
  empty: (expr: unknown) => 1 | 0

  filereadable: (file: string) => 1 | 0

  glob: (expr: unknown) => string

  globpath: (path: string, expr: string) => string

  join: (list: Array<unknown>, sep?: string) => string

  split: (string: string, pattern?: string, keepempty?: boolean) => Array<string>

  stdpath: <T extends StdpathParams>(what: T) => StdpathMap[T]

  system: (cmd: string | Array<string>) => string
}

/** @noSelf **/
declare interface Api {
  nvim_set_keymap: (
    mode: '' | 'n' | 'v' | 's' | 'x' | 'o' | '!' | 'i' | 'l' | 'c' | 't',
    lhs: string,
    rhs: string,
    opts: {
      noremap?: boolean
      nowait?: boolean
      silent?: boolean
      script?: boolean
      expr?: boolean
      unique?: boolean
    },
  ) => void
  nvim_replace_termcodes: (str: string, fromPart: boolean, doLt: boolean, special: boolean) => string
}

/** @noSelf **/
declare interface Loop {
  os_uname: () => {
    sysname: string
    release: string
    version: string
    machine: string
  }

  os_homedir: () => string

  fs_stat: (path: string) => unknown | null
}

/** @noSelf **/
declare interface Fs {
  joinpath: (...args: Array<string>) => string
}

declare interface vimOptList<T> {
  append: (e: T) => void
  prepend: (e: T) => void
  remove: (e: T) => void
}
