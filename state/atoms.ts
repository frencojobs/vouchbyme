import { atom } from 'jotai'

import { User } from '../types/api'

export const themeAtom = atom<'light' | 'dark'>('light')
export const signInCacheAtom = atom<{
  username: string
  password: string
  next?: string
} | null>(null)
export const userAtom = atom<User | null>(null)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const avatarAtom = atom<any>(null)
export const currentProfileMenuIndexAtom = atom<number>(0)
