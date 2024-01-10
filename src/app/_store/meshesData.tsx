import { atomWithImmer } from 'jotai-immer'
import { initialData } from '../_data/initialData'
import { IGranulometriaData } from '../_interfaces/interfaces'
import { atom } from 'jotai'
import { atomCompleteWeight, atomIsThereLossedMaterial } from './lossedMaterial'
import LossedMaterial from '../_components/firstOrder/lossed-material'

type stringFields = 'astm'
type numberFields = 'iso' | 'weight'

const atomMeshesData = atomWithImmer<IGranulometriaData[]>(
  initialData.meshesData
)

// getters:

export const atomGetMeshesData = atom((get) => get(atomMeshesData))

export const atomGetMeshesResults = atom((get) => {
  //TODO  corregir:
  const meshesData = get(atomMeshesData)
  const completeWeight = get(atomCompleteWeight)
  const isThereLossedMaterial = get(atomIsThereLossedMaterial)

  const totalWeight = meshesData.reduce((acc, curr) => acc + curr.weight, 0)

  const lossedMaterialWeight = totalWeight - completeWeight

  const meshesResults = meshesData.map((mesh) => {
    const { weight } = mesh
    const correctedWeight = isThereLossedMaterial
      ? weight - (lossedMaterialWeight * weight) / completeWeight
      : weight
    const retainedPercentage = (correctedWeight * 100) / completeWeight
    return {
      ...mesh,
      correctedWeight,
      retainedPercentage,
    }
  })

  return meshesResults
})

// setters:

export const atomSetMeshesChangeStringField = atom(
  null,
  (
    _get,
    set,
    {
      value,
      index,
      field,
    }: { value: string; index: number; field: stringFields }
  ) => {
    set(atomMeshesData, (prev) => {
      prev[index][field] = value
    })
  }
)

export const atomSetMeshesChangeNumberField = atom(
  null,
  (
    _get,
    set,
    {
      value,
      index,
      field,
    }: { value: number; index: number; field: numberFields }
  ) => {
    set(atomMeshesData, (prev) => {
      prev[index][field] = value
    })
  }
)
