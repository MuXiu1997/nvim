import { ensurePlugins, loadCompiled } from './plugins'

const skipInstall = !ensurePlugins()

require('./options')
require('./mapping')

if (skipInstall) {
  loadCompiled()
}
