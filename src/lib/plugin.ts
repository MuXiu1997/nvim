/** @noSelfInFile **/

export function defineModule(plugins: Array<LazySpec>) {
  return plugins
}

export function definePlugin(repo: string | undefined, spec: Omit<LazySpec, 1> = {}): LazySpec {
  return {
    1: repo,
    ...spec,
  }
}
