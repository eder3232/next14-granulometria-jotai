import { atom } from 'jotai'
// import { useUpdateAtom } from 'jotai/utils'
import { atomWithImmer } from 'jotai-immer'

const atomExample = atomWithImmer<number[]>([1, 2, 3, 4, 5])

export const atomGetExample = atom((get) => get(atomExample))

export const atomSetExampleInsertZero = atom(null, (get, set) => {
  set(atomExample, (draft) => {
    draft.unshift(0)
  })
})
