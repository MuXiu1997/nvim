import { defineModule } from '../lib/plugin'

import type * as option from '../lib/option'
import type * as util from '../lib/util'

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

  'kyazdani42/nvim-tree.lua': {
    requires: ['kyazdani42/nvim-web-devicons'],
    config: () => {
      const treeCb = require<{
        nvim_tree_callback: (this: void, name: string) => string
      }>('nvim-tree.config').nvim_tree_callback
      const toggleKey = '<Tab>e'
      const toggleCb = ':NvimTreeToggle<CR>'
      require<Setupable>('nvim-tree').setup({
        disable_netrw: true,
        hijack_netrw: true,
        view: {
          mappings: {
            custom_only: true,
            list: [
              { key: toggleKey, cb: toggleCb },
              { key: ['<CR>', 'o', '<2-LeftMouse>'], cb: treeCb('edit') },
              { key: ['<2-RightMouse>', '<C-]>'], cb: treeCb('cd') },
              { key: '<C-v>', cb: treeCb('vsplit') },
              { key: '<C-x>', cb: treeCb('split') },
              { key: '<C-t>', cb: treeCb('tabnew') },
              { key: '<', cb: treeCb('prev_sibling') },
              { key: '>', cb: treeCb('next_sibling') },
              { key: 'P', cb: treeCb('parent_node') },
              { key: '<BS>', cb: treeCb('close_node') },
              { key: '<Tab><Tab>', cb: treeCb('preview') },
              { key: 'K', cb: treeCb('first_sibling') },
              { key: 'J', cb: treeCb('last_sibling') },
              { key: 'I', cb: treeCb('toggle_ignored') },
              { key: 'H', cb: treeCb('toggle_dotfiles') },
              { key: 'R', cb: treeCb('refresh') },
              { key: 'a', cb: treeCb('create') },
              { key: 'dD', cb: treeCb('remove') },
              { key: 'dT', cb: treeCb('trash') },
              { key: '<S-a>', cb: treeCb('rename') },
              { key: 'cw', cb: treeCb('full_rename') },
              { key: 'dd', cb: treeCb('cut') },
              { key: 'yy', cb: treeCb('copy') },
              { key: 'pp', cb: treeCb('paste') },
              { key: 'yn', cb: treeCb('copy_name') },
              { key: 'yrp', cb: treeCb('copy_path') },
              { key: 'yp', cb: treeCb('copy_absolute_path') },
              { key: '[c', cb: treeCb('prev_git_item') },
              { key: ']c', cb: treeCb('next_git_item') },
              { key: '-', cb: treeCb('dir_up') },
              { key: 'r', cb: treeCb('system_open') },
              { key: 'q', cb: treeCb('close') },
              { key: 'g?', cb: treeCb('toggle_help') },
            ],
          },
        },
      })
      vim.api.nvim_set_keymap('n', toggleKey, toggleCb, { noremap: true })
      vim.api.nvim_set_keymap('n', '<Tab>ge', ':NvimTreeFocus<CR>', {
        noremap: true,
      })
    },
  },

  'lukas-reineke/indent-blankline.nvim': {
    config: () => {
      require<typeof option>('../lib/option').setOptions({
        list: true,
        listchars: 'tab:--,trail:.,space:⋅,',
      })
      require<Setupable>('indent_blankline').setup({
        show_end_of_line: false,
      })
    },
  },

  'nvim-telescope/telescope.nvim': {
    requires: ['nvim-lua/plenary.nvim'],
  },

  'gelguy/wilder.nvim': {
    config: () => {
      _G.__wilder_start = () => {
        const setOption = vim.fn['wilder#set_option']
        setOption('use_python_remote_plugin', true)

        vim.fn['wilder#setup']({
          modes: [':', '/', '?'],
        })

        vim.cmd(`call wilder#set_option('pipeline', [
\\   wilder#branch(
\\     wilder#cmdline_pipeline({
\\       'fuzzy': 1,
\\       'set_pcre2_pattern': has('nvim'),
\\     }),
\\     wilder#python_search_pipeline({
\\       'pattern': 'fuzzy',
\\     }),
\\   ),
\\ ])`)

        vim.cmd(`call wilder#set_option('renderer', wilder#renderer_mux({
\\ ':': wilder#popupmenu_renderer({
\\   'highlighter': [
\\     wilder#pcre2_highlighter(),
\\     wilder#basic_highlighter(),
\\   ],
\\   'left': [
\\     ' ',
\\     wilder#popupmenu_devicons(),
\\   ],
\\   'right': [
\\     ' ',
\\     wilder#popupmenu_scrollbar(),
\\   ],
\\ }),
\\ '/': wilder#wildmenu_renderer({
\\   'highlighter': [
\\     wilder#pcre2_highlighter(),
\\     wilder#basic_highlighter(),
\\   ],
\\ }),
\\ }))`)

        const arrayForEach = require<typeof util>('../lib/util').arrayForEach
        const recordForEach = require<typeof util>('../lib/util').recordForEach
        recordForEach(
          {
            next: ['<C-j>', '<C-n>', '<Tab>'],
            previous: ['<C-k>', '<C-p>', '<S-Tab>'],
          },
          (k, hss) => {
            arrayForEach(hss, (_, hs) => {
              vim.api.nvim_set_keymap(
                'c',
                hs,
                `wilder#in_context() ? wilder#${k}() : "${hs}"`,
                {
                  expr: true,
                }
              )
            })
          }
        )

        vim.cmd('call wilder#main#start()')
      }
      vim.cmd('autocmd CmdlineEnter * ++once lua __wilder_start()')
    },
  },

  'norcalli/nvim-colorizer.lua': {
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
      require<Setupable>('colorizer').setup(
        {
          1: 'html',
          2: 'css',
          3: 'javascript',
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
        }
      )
    },
  },
})

export default ui
