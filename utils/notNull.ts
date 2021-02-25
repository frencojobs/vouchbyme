export function notNull<T>(x: T | null): x is null {
  return x !== null
}
