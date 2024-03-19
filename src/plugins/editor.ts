import { defineModule, definePlugin } from '../lib/plugin'

const event = ['BufRead', 'BufNewFile', 'InsertEnter']

// noinspection JSUnusedGlobalSymbols
export default defineModule([
  definePlugin('tpope/vim-surround', { event }),

  definePlugin('tpope/vim-repeat', { event }),

  definePlugin('tpope/vim-speeddating', { event }),

  definePlugin('tommcdo/vim-exchange', { event }),

  definePlugin('michaeljsmith/vim-indent-object', { event }),

  definePlugin('junegunn/vim-easy-align', {
    event,
    config: () => {
      vim.api.nvim_set_keymap('n', 'ga', '<Plug>(EasyAlign)', {})
      vim.api.nvim_set_keymap('x', 'ga', '<Plug>(EasyAlign)', {})
    },
  }),

  definePlugin('jiangmiao/auto-pairs', { event }),

  definePlugin('phaazon/hop.nvim', {
    event,
    config: () => {
      typeRequire<Setupable>('hop').setup()
      vim.api.nvim_set_keymap('n', '<Tab><Tab>', '<Cmd>lua require("hop").hint_char1()<CR>', {})
    },
  }),
])
