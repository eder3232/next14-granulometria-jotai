import { IInitialData } from '../_interfaces/interfaces'

export const initialData: IInitialData = {
  lossedMaterial: {
    isThereLossedMaterial: false,
    completeWeight: 0,
  },
  meshesData: [
    { astm: '3/4"', weight: 10 },
    { astm: '3/8"', weight: 10 },
    { astm: 'No. 4', weight: 10 },
    { astm: 'No. 6', weight: 10 },
    { astm: 'No. 8', weight: 10 },
    { astm: 'No. 10', weight: 10 },
    { astm: 'No. 20', weight: 10 },
    { astm: 'No. 40', weight: 10 },
    { astm: 'No. 50', weight: 10 },
    { astm: 'No. 100', weight: 10 },
    { astm: 'No. 200', weight: 10 },
  ],
}
