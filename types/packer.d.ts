/** @noSelf **/
declare interface Packer {
  init: (configuration: unknown) => void
  reset: () => void
  use: (plugin: Plugin) => void
  install: () => void
  sync: () => void
}
