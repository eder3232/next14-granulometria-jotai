import { atom } from 'jotai'
import { atomWithImmer } from 'jotai-immer'
import { atomGetMeshesData } from './meshesData'

type ISeverity = 'error' | 'warning' | 'info'
type ITypeError = 'aberturas' | 'pesos'
export interface IError {
  name: string
  message: string
  // stack: string
  typeError: ITypeError
  errorCode: number
  severity: ISeverity
}

export const errorsCodes: {
  [key: number]: IError
} = {
  //100 - mallas
  100: {
    name: 'Orden de aberturas',
    message: 'Las aberturas deben estar ordenadas de mayor a menor.',
    typeError: 'aberturas',
    errorCode: 100,
    severity: 'warning',
  },
  101: {
    name: 'Aberturas repetidas',
    message: 'No puede haber aberturas repetidas',
    typeError: 'aberturas',
    errorCode: 101,
    severity: 'warning',
  },
  102: {
    name: 'Peso de la primera malla',
    message:
      'Se recomienda que la primera malla debe tener peso 0 para graficar correctamente la curva granulométrica.',
    typeError: 'aberturas',
    errorCode: 101,
    severity: 'warning',
  },

  200: {
    name: 'Peso de muestra',
    message: 'El peso total de la muestra no puede ser 0.',
    typeError: 'pesos',
    errorCode: 200,
    severity: 'error',
  },
}

export const atomGetErrors = atom<IError[]>((get) => {
  const listErrors: IError[] = []

  //Verificar que el orden de las aberturas sea de mayor a menor

  const meshesData = get(atomGetMeshesData)
  const isos = meshesData.map((mesh) => mesh.iso)
  const isosSorted = [...isos].sort((a, b) => a - b)
  const indexError = [...isos].findIndex(
    (iso, index) => iso !== isosSorted[index]
  )

  if (
    isos.length !== isosSorted.length ||
    isos.every((value, index) => value !== isosSorted[index])
  ) {
    listErrors.push({
      ...errorsCodes[100],
      message:
        'Las aberturas deben estar ordenadas de mayor a menor - malla: ' +
        meshesData[indexError].astm,
    })
  }

  return listErrors
})
