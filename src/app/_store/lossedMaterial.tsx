import { atom } from 'jotai'
import { initialData } from '../_data/initialData'

// atoms:

export const atomIsThereLossedMaterial = atom(
  initialData.lossedMaterial.isThereLossedMaterial
)

export const atomCompleteWeight = atom(
  initialData.lossedMaterial.completeWeight
)

// getters:

export const atomGetIsThereLossedMaterial = atom((get) =>
  get(atomIsThereLossedMaterial)
)

export const atomGetCompleteWeight = atom((get) => get(atomCompleteWeight))

// setters

export const atomSetSwitchLossedMaterial = atom(null, (get, set) => {
  set(atomIsThereLossedMaterial, (prev) => !prev)
})

export const atomSetCompleteWeight = atom(null, (get, set, update: number) => {
  set(atomCompleteWeight, update)
})
