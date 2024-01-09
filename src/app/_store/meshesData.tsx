import { atomWithImmer } from 'jotai-immer'
import { initialData } from '../_data/initialData'
import { IGranulometriaData } from '../_interfaces/interfaces'
import { atom } from 'jotai'

const initialMeshesData = initialData.meshesData

const atomMeshesData = atomWithImmer<IGranulometriaData[]>(
  initialData.meshesData
)

export const atomGetMeshesData = atom((get) => get(atomMeshesData))
