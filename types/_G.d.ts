/** @noSelfInFile **/

declare global {
  const vim: Vim

  function print(...args: Array<unknown>): void
  function error(message: string): void

  function pprint(...args: Array<unknown>): void
  function typeRequire<T = unknown>(modname: string): T
}
export {}
