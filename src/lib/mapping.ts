/** @noSelfInFile **/

export function t(hs: string): string {
  return vim.api.nvim_replace_termcodes(hs, true, true, true)
}
