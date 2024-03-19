/** @noSelfInFile **/

const separator = vim.loop.os_uname().sysname === 'Windows' ? '\\' : '/'
function join(...args: Array<unknown>) {
  return vim.fn.join(args, separator)
}

export { separator, join }
