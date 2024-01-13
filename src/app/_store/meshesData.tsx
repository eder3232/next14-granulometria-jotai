import { produce } from 'immer'
import { atom } from 'jotai'
import { v4 as uuidv4 } from 'uuid'
import { initialData } from '../_data/initialData'
import {
  IGranulometriaData,
  IGranulometriaDataWithId,
} from '../_interfaces/interfaces'
import { atomCompleteWeight, atomIsThereLossedMaterial } from './lossedMaterial'

type stringFields = 'astm'
type numberFields = 'iso' | 'weight'

const atomMeshesData = atom<IGranulometriaDataWithId[]>(
  initialData.meshesData.map((e) => ({ ...e, id: uuidv4() }))
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
    // set(atomMeshesData, (prev) => {
    //   prev[index][field] = value
    // })
    const baseState = _get(atomMeshesData)

    set(
      atomMeshesData,
      produce(baseState, (draft) => {
        draft[index][field] = value
      })
    )
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
    // set(atomMeshesData, (prev) => {
    //   prev[index][field] = value
    // })

    const baseState = _get(atomMeshesData)

    set(
      atomMeshesData,
      produce(baseState, (draft) => {
        draft[index][field] = value
      })
    )
  }
)

export const atomSetMeshesInsert = atom(
  null,
  (_get, set, { mesh, index }: { mesh: IGranulometriaData; index: number }) => {
    const baseState = _get(atomMeshesData)
    set(
      atomMeshesData,
      produce(baseState, (draft) => {
        draft.splice(index, 0, { ...mesh, id: uuidv4() })
      })
    )
  }
)
