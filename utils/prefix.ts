export function prefix(p: string, i?: string | null): string | null {
  if (i) return `${p}${i}`
  else return null
}
