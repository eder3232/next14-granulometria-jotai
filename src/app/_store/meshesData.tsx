import { produce } from 'immer'
import { atom } from 'jotai'
import { v4 as uuidv4 } from 'uuid'
import { initialData } from '../_data/initialData'
import {
  IGranulometriaData,
  IGranulometriaDataWithId,
  IResults,
} from '../_interfaces/interfaces'
import { atomCompleteWeight, atomIsThereLossedMaterial } from './lossedMaterial'

type stringFields = 'astm'
type numberFields = 'iso' | 'weight'

const atomMeshesData = atom<IGranulometriaDataWithId[]>(
  initialData.meshesData.map((e) => ({ ...e, id: uuidv4() }))
)

// getters:

export const atomGetMeshesData = atom((get) => get(atomMeshesData))

export const atomGetMeshesResults = atom<IResults[]>((get) => {
  //TODO  corregir:
  const meshesData = get(atomMeshesData)
  const completeWeight = get(atomCompleteWeight)
  const isThereLossedMaterial = get(atomIsThereLossedMaterial)

  const totalWeight = meshesData.reduce((acc, curr) => acc + curr.weight, 0)

  let lossedMaterialWeight = completeWeight - totalWeight

  if (!isThereLossedMaterial) {
    lossedMaterialWeight = 0
  }

  const meshesResults = meshesData.map((mesh) => ({
    pesoCorregido: 0,
    retenido: 0,
    retenidoAcumulado: 0,
    pasante: 0,
  }))

  // Si hay perdida, hacer la corrección de pesos:

  let correctionForEachMesh = lossedMaterialWeight / meshesData.length

  meshesResults.forEach((meshResult, index) => {
    meshResult.pesoCorregido = meshesData[index].weight + correctionForEachMesh
  })

  const newTotalWeight = meshesResults.reduce(
    (acc, curr) => acc + curr.pesoCorregido,
    0
  )

  meshesResults.forEach((meshResult, index) => {
    meshResult.retenido = (meshResult.pesoCorregido / newTotalWeight) * 100
  })

  meshesResults.forEach((meshResult, index) => {
    meshResult.retenidoAcumulado =
      index === 0
        ? meshResult.retenido
        : meshResult.retenido + meshesResults[index - 1].retenidoAcumulado
  })

  meshesResults.forEach((meshResult, index) => {
    meshResult.pasante = 100 - meshResult.retenidoAcumulado
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

export const atomSetMeshesDelete = atom(
  null,
  (_get, set, { index }: { index: number }) => {
    const baseState = _get(atomMeshesData)
    set(
      atomMeshesData,
      produce(baseState, (draft) => {
        draft.splice(index, 1)
      })
    )
  }
)
