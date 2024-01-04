import { atom } from 'jotai'
import { IUsedMesh } from '../_interfaces/interfaces'
import { atomWithImmer } from 'jotai-immer'
import { initialData } from '../_data/initialData'
import { dataAstmMeshes } from '../_data/astmMeshes'

export const atomUsedMeshes = atomWithImmer<IUsedMesh[]>(
  dataAstmMeshes.map((e) => ({
    astm: e.astm,
    iso: e.iso,
    serie: e.serie,
    isUsed: initialData.meshesData.map((e) => e.astm).includes(e.astm),
    isUsual: e.isUsual,
  }))
)
export const atomSwitchMeshAsUsed = atom(
  null,
  (_get, set, meshAstm: string) => {
    const index = _get(atomUsedMeshes).findIndex(
      (mesh) => mesh.astm === meshAstm
    )
    set(atomUsedMeshes, (draft) => {
      draft[index].isUsed = !draft[index].isUsed
    })
  }
)
