import { LayoutType } from '../types'

export function layoutToType(i?: string | null): LayoutType {
  if (!i) return 'column'
  else return i as LayoutType
}
