import { atom } from 'jotai'
import { initialData } from '../_data/initialData'

export const isThereLossedMaterial = atom(
  initialData.lossedMaterial.isThereLossedMaterial
)

export const completeWeight = atom(initialData.lossedMaterial.completeWeight)

export const setSwitchLossedMaterial = atom(null, (get, set, update) => {
  set(isThereLossedMaterial, (prev) => !prev)
})

export const setCompleteWeight = atom(null, (get, set, update: number) => {
  set(completeWeight, update)
})
