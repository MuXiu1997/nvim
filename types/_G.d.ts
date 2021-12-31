/** @noSelfInFile **/

declare global {
  const vim: Vim

  function print(...args: Array<unknown>): void
  function pprint(...args: Array<unknown>): void
  function error(message: string): void

  function require<T>(modname: string): T

  function __wilder_start():void
}
export {}
