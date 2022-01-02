/** @noSelfInFile **/

declare global {
  const vim: Vim

  function print(...args: Array<unknown>): void
  function error(message: string): void

  function pprint(...args: Array<unknown>): void
  function typeRequire<T>(modname: string): T

  function __wilder_start():void

  const __modules: Array<string>
  function __coc_tab():string
  function __coc_cr():string
}
export {}
