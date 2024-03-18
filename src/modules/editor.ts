import { defineModule } from '../lib/plugin'

const event = ['BufRead', 'BufNewFile', 'InsertEnter']

const editor = defineModule({
  'tpope/vim-surround': { event },

  'tpope/vim-repeat': { event },

  'tpope/vim-speeddating': { event },

  'tommcdo/vim-exchange': { event },

  'michaeljsmith/vim-indent-object': { event },

  'junegunn/vim-easy-align': {
    event,
    config: () => {
      vim.api.nvim_set_keymap('n', 'ga', '<Plug>(EasyAlign)', {})
      vim.api.nvim_set_keymap('x', 'ga', '<Plug>(EasyAlign)', {})
    },
  },

  'jiangmiao/auto-pairs': { event },

  'phaazon/hop.nvim': {
    event,
    config: () => {
      typeRequire<Setupable>('hop').setup()
      vim.api.nvim_set_keymap(
        'n',
        '<Tab><Tab>',
        '<Cmd>lua require("hop").hint_char1()<CR>',
        {}
      )
    },
  },
})

// noinspection JSUnusedGlobalSymbols
export default editor
