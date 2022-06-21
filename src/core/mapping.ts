const map = vim.api.nvim_set_keymap

map('n', '<SPACE>nh', ':noh<CR>', { noremap: true })

map('', '<SPACE>a', '^', { noremap: true })
map('', '<SPACE>e', '$', { noremap: true })

map('n', '<SPACE>m', '`m', { noremap: true })
map('n', 'Q', '@q', { noremap: true })

map('', '<SPACE>p', '"0p', { noremap: true })
map('', '<SPACE>P', '"0P', { noremap: true })

map('o', 'ij', `i'`, { noremap: true })
map('o', 'iJ', `i"`, { noremap: true })
map('o', 'aj', `a'`, { noremap: true })
map('o', 'aJ', `a"`, { noremap: true })

map('v', 'ij', `i'`, { noremap: true })
map('v', 'iJ', `i"`, { noremap: true })
map('v', 'aj', `a'`, { noremap: true })
map('v', 'aJ', `a"`, { noremap: true })
