import { IInitialData } from '../_interfaces/interfaces'

export const initialData: IInitialData = {
  lossedMaterial: {
    isThereLossedMaterial: false,
    completeWeight: 150,
  },
  meshesData: [
    { astm: '3/4"', iso: 19, weight: 10 },
    { astm: '3/8"', iso: 9.5, weight: 10 },
    { astm: 'No. 4', iso: 4.75, weight: 10 },
    { astm: 'No. 6', iso: 3.35, weight: 10 },
    { astm: 'No. 8', iso: 2.36, weight: 10 },
    { astm: 'No. 10', iso: 2, weight: 10 },
    { astm: 'No. 20', iso: 0.85, weight: 10 },
    { astm: 'No. 40', iso: 0.71, weight: 10 },
    { astm: 'No. 50', iso: 0.3, weight: 10 },
    { astm: 'No. 100', iso: 0.15, weight: 10 },
    { astm: 'No. 200', iso: 0.075, weight: 10 },
    { astm: 'Fondo', iso: 0, weight: 10 },
  ],
}
