/** @noSelfInFile **/

export function recordForEach<R extends Record<any, any>>(
  record: R,
  func: (k: keyof R, v: R[keyof R]) => void
): void

export function recordToArray<R extends Record<any, any>, T>(
  record: R,
  func: (k: keyof R, v: R[keyof R]) => T
): Array<T>

export function arrayForEach<T>(
  arr: Array<T>,
  func: (i: number, v: T) => void
): void

export function arrayMap<T, D>(
  arr: Array<T>,
  func: (i: number, v: T) => D
): Array<D>
