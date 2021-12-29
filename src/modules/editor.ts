import { defineModule } from '../lib/plugin'

const editor = defineModule({
  'tpope/vim-surround': {},

  'tommcdo/vim-exchange': {},

  'michaeljsmith/vim-indent-object': {},

  'junegunn/vim-easy-align': {
    config: () => {
      vim.api.nvim_set_keymap('n', 'ga', '<Plug>(EasyAlign)', {})
      vim.api.nvim_set_keymap('x', 'ga', '<Plug>(EasyAlign)', {})
    },
  },

  'jiangmiao/auto-pairs': {},

  'phaazon/hop.nvim': {
    config: () => {
      require<{ setup: (this: void, opts?: unknown) => void }>('hop').setup()
      vim.api.nvim_set_keymap(
        'n',
        '<TAB><TAB>',
        '<cmd>lua require("hop").hint_char1()<CR>',
        {}
      )
    },
  },
})

export default editor
