const map = vim.api.nvim_set_keymap

map('n', '<SPACE>nh', ':noh<CR>', { noremap: true })

map('', '<SPACE>a', '^', { noremap: true })
map('', '<SPACE>e', '$', { noremap: true })

map('n', '<SPACE>m', '`m', { noremap: true })
map('n', 'Q', '@q', { noremap: true })
