/** @noSelfInFile **/

const separator = vim.loop.os_uname().sysname === 'Windows' ? '\\' : '/'
const home = vim.loop.os_homedir()
const join = (...args: Array<unknown>) => {
  return vim.fn.join(args, separator)
}

export { separator, home, join }
