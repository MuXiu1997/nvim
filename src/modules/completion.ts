import { defineModule } from '../lib/plugin'

import type * as mapping from '../lib/mapping'
import type * as option from '../lib/option'

const completion = defineModule({
  'neoclide/coc.nvim': {
    branch: 'release',
    config: () => {
      require<typeof option>('../lib/option').setOptions({
        signcolumn: 'number',
      })
      const t = require<typeof mapping>('../lib/mapping').t

      vim.g.coc_global_extensions = [
        'coc-tabnine',
        'coc-html',
        'coc-yaml',
        'coc-tsserver',
        'coc-sh',
        'coc-pyright',
        'coc-json',
        'coc-css',
        '@yaegassy/coc-volar',
      ]

      const checkBackSpace = () => {
        const col = vim.fn.col('.') - 1
        if (col === 0) {
          return true
        }
        const line = vim.fn.getline('.') as {
          sub: (
            index: number,
            endindex?: number
          ) => { match: (regex: string) => string | undefined }
        }
        const c = line.sub(col, col)
        return c.match('%s') !== undefined
      }

      _G.__coc_tab = () => {
        if (vim.fn.pumvisible() === 1) {
          return t('<C-n>')
        }
        if (checkBackSpace()) {
          return t('<Tab>')
        }
        return vim.fn['coc#refresh']()
      }
      _G.__coc_cr = () => {
        if (vim.fn.pumvisible() === 1) {
          return vim.fn['coc#_select_confirm']()
        }
        return t('<CR>')
      }
      vim.api.nvim_set_keymap('i', '<Tab>', 'v:lua.__coc_tab()', {
        expr: true,
        noremap: true,
        silent: true,
      })
      vim.api.nvim_set_keymap('i', '<C-Space>', 'coc#refresh()', {
        expr: true,
        noremap: true,
        silent: true,
      })
      vim.api.nvim_set_keymap('i', '<CR>', 'v:lua.__coc_cr()', {
        expr: true,
        noremap: true,
        silent: true,
      })

      vim.cmd(`autocmd CursorHold * silent call CocActionAsync('highlight')`)
    },
  },
})

export default completion
