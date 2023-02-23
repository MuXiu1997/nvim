import { defineModule } from '../lib/plugin'

const lang = defineModule({
  'nvim-treesitter/nvim-treesitter': {
    event: 'BufRead',
    config: () => {
      typeRequire<{ prefer_git: boolean }>(
        'nvim-treesitter.install'
      ).prefer_git = true
      typeRequire<Setupable>('nvim-treesitter.configs').setup({
        ensure_installed: 'all',
        highlight: {
          enable: true,
        },
      })
    },
  },
})

// noinspection JSUnusedGlobalSymbols
export default lang
