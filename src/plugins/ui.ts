import { defineModule, definePlugin } from '../lib/plugin'

// noinspection JSUnusedGlobalSymbols
export default defineModule([
  definePlugin('arcticicestudio/nord-vim', {
    lazy: false,
    priority: 1000,
    config: () => {
      vim.cmd('colorscheme nord')
    },
  }),

  definePlugin('itchyny/lightline.vim', {
    config: () => {
      const { setOptions } = require('../lib/option') as typeof import('../lib/option')

      setOptions({
        showmode: false,
        laststatus: 2,
      })
      vim.g.lightline = {
        colorscheme: 'nord',
        enable: {
          statusline: true,
          tabline: false,
        },
      }
    },
  }),

  definePlugin('machakann/vim-highlightedyank'),

  definePlugin('psliwka/vim-smoothie'),

  definePlugin('norcalli/nvim-colorizer.lua', {
    event: ['BufRead'],
    config: () => {
      const RGB = true
      const RRGGBB = true
      const names = true
      const RRGGBBAA = false
      const rgb_fn = false
      const hsl_fn = false
      const css = false
      const css_fn = false
      typeRequire<Setupable>('colorizer').setup(
        {
          // eslint-disable-next-line style/quote-props
          1: 'html',
          // eslint-disable-next-line style/quote-props
          2: 'css',
          // eslint-disable-next-line style/quote-props
          3: 'javascript',
          // eslint-disable-next-line style/quote-props
          4: 'vue',
          '*': {
            RGB,
            RRGGBB,
            names: false,
            RRGGBBAA,
          },
        },
        {
          RGB,
          RRGGBB,
          names,
          RRGGBBAA,
          rgb_fn,
          hsl_fn,
          css,
          css_fn,
          mode: 'background',
        },
      )
    },
  }),

  definePlugin('akinsho/bufferline.nvim', {
    version: '*',
    dependencies: [definePlugin('kyazdani42/nvim-web-devicons')],
    config: () => {
      typeRequire<Setupable>('bufferline').setup({
        highlights: {},
        options: {
          tab_size: 1,
          diagnostics: 'coc',
          diagnostics_update_in_insert: true,
          separator_style: 'padded_slant',
          offsets: [
            {
              filetype: 'NvimTree',
              // TODO: dir basename
              text: 'File Explorer',
              text_align: 'center',
              highlight: 'Directory',
            },
          ],
          custom_areas: {
            right: () => {
              const result = []
              const cocDiagnosticInfo = vim.b.coc_diagnostic_info as {
                error: number
                warning: number
                hint: number
                information: number
              }

              const { error, warning, hint, information } = cocDiagnosticInfo

              if (error !== 0) {
                result[result.length] = {
                  text: `  ${error}`,
                  guifg: '#EC5241',
                }
              }
              if (warning !== 0) {
                result[result.length] = {
                  text: `  ${warning}`,
                  guifg: '#EFB839',
                }
              }
              if (hint !== 0) {
                result[result.length] = {
                  text: `  ${hint}`,
                  guifg: '#A3BA5E',
                }
              }
              if (information !== 0) {
                result[result.length] = {
                  text: `  ${information}`,
                  guifg: '#7EA9A7',
                }
              }
              return result
            },
          },
        },
      })
    },
  }),

  definePlugin('lukas-reineke/indent-blankline.nvim', {
    main: 'ibl',
    config: () => {
      const { setOptions } = require('../lib/option') as typeof import('../lib/option')
      setOptions({
        list: true,
        listchars: 'tab:--,trail:.,space:⋅,',
      })

      typeRequire<Setupable>('ibl').setup()
    },
  }),
])
