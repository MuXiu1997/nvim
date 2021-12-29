/** @noSelf **/
declare interface Vim {
  api: Api
  fn: Fn
  loop: Loop

  g: Record<string, unknown>
  o: Record<string, unknown>

  opt: Record<string, unknown>

  cmd: (cmd: string) => void
  inspect: (o: unknown) => string
  split: (
    s: string,
    sep: string,
    kwargs?: { plain?: boolean; trimempty?: boolean }
  ) => Array<string>
  tbl_extend: (
    behavior: 'error' | 'keep' | 'force',
    ...tables: Array<Record<any, any>>
  ) => Record<any, any>
}

/** @noSelf **/
declare interface Fn {
  empty(expr: unknown): 1 | 0
  filereadable(file: string): 1 | 0
  glob(expr: unknown): string
  globpath(path: string, expr: string): string
  join(list: Array<unknown>, sep?: string): string
  stdpath(what: 'cache' | 'config' | 'data'): string
  stdpath(what: 'config_dirs' | 'data_dirs'): Array<string>
  system(cmd: string | Array<string>): string
}

/** @noSelf **/
declare interface Api {
  nvim_set_keymap(
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
    }
  ): void
}
/** @noSelf **/
declare interface Loop {
  os_uname(): {
    sysname: string
    release: string
    version: string
    machine: string
  }

  os_homedir(): string
}
