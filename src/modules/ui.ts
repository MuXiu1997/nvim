import { defineModule } from '../lib/plugin'

import type * as option from '../lib/option'

const ui = defineModule({
  'arcticicestudio/nord-vim': {
    config: () => {
      vim.cmd('colorscheme nord')
    },
  },

  'itchyny/lightline.vim': {
    config: () => {
      require<typeof option>('../lib/option').setOptions({
        showmode: false,
        laststatus: 2,
      })
      vim.g.lightline = {
        colorscheme: 'nord',
      }
    },
  },

  'machakann/vim-highlightedyank': {},

  'psliwka/vim-smoothie': {},
})

export default ui
