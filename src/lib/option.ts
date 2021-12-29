/** @noSelfInFile **/

import { recordForEach } from './util'

type Options = Record<string, unknown>

function setOptions(options: Options) {
  recordForEach(options, (k, v) => {
    vim.opt[k] = v
  })
}

export { setOptions }
