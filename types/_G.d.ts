/** @noSelfInFile **/

declare global {
  const vim: Vim

  function print(...args: Array<unknown>): void
  function error(message: string): void

  function require<T>(modname: string): T
}
export {}
