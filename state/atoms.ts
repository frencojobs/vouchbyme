import { CognitoUser } from '@aws-amplify/auth'
import { atom } from 'jotai'

export const themeAtom = atom<'light' | 'dark'>('light')
export const userAtom = atom<null | CognitoUser>(null)
