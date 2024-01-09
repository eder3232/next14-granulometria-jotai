import { atom } from 'jotai'

const atomDecimals = atom(2)

export const atomGetDecimals = atom((get) => get(atomDecimals))

export const atomSetDecimals = atom(null, (get, set, update: number) => {
  set(atomDecimals, update)
})
