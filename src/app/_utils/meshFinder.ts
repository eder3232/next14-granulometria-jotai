import { dataAstmMeshes } from '../_data/astmMeshes'
import { IGranulometriaData } from '../_interfaces/interfaces'

export function meshFinder(isoUp: number, isoDown: number): IGranulometriaData {
  const defaultMesh = {
    astm: '',
    iso: 0,
    weight: 0,
  }

  if (isoUp === 0 || isoDown === 0) return defaultMesh

  let indexUp = -1

  for (let i = 0; i < dataAstmMeshes.length; i++) {
    if (dataAstmMeshes[i].iso - isoUp < dataAstmMeshes[i].iso * 0.05) {
      indexUp = i
      break
    }
  }

  let indexDown = -1
  for (let i = indexUp; i < dataAstmMeshes.length; i++) {
    if (dataAstmMeshes[i].iso - isoDown < dataAstmMeshes[i].iso * 0.05) {
      indexDown = i
      break
    }
  }

  const slicedMeshes = dataAstmMeshes.slice(indexUp + 1, indexDown)

  if (slicedMeshes.length === 0) return defaultMesh

  // Si existe una malla usual, se retorna la primera que se encuentre

  const existUsualMesh = slicedMeshes.find((mesh) => mesh.isUsual) !== undefined

  const firstUsualMesh = slicedMeshes.find((mesh) => mesh.isUsual)

  const usualMeshToInsert = {
    astm: firstUsualMesh?.astm || '',
    iso: firstUsualMesh?.iso || 0,
    weight: 0,
  }

  if (existUsualMesh) return usualMeshToInsert

  // Si no existe una malla usual, se retorna la primera que se encuentre

  const firstMesh = slicedMeshes[0]

  const meshToInsert = {
    astm: firstMesh.astm,
    iso: firstMesh.iso,
    weight: 0,
  }

  if (firstMesh) return meshToInsert

  return defaultMesh
}
