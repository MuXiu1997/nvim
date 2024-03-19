/** @noSelfInFile **/

type Options = Record<string, unknown>

function setOptions(options: Options) {
  Object.entries(options).forEach(([k, v]) => {
    vim.opt[k] = v
  })
}

export { setOptions }
