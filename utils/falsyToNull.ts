export function falsyToNull<T>(x: T): T | null {
  if (x) return x
  else return null
}
