import { atom } from 'jotai'

export const themeAtom = atom<'light' | 'dark'>('light')
export const signInCacheAtom = atom<{
  username: string
  password: string
  next?: string
} | null>(null)
