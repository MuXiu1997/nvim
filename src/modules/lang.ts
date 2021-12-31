import { defineModule } from '../lib/plugin'

const lang = defineModule({
  'nvim-treesitter/nvim-treesitter': {
    event: 'BufRead',
    config: () => {
      require<Setupable>('nvim-treesitter.configs').setup({
        ensure_installed: 'maintained',
        highlight: {
          enable: true,
        },
      })
    },
  },
})

export default lang
