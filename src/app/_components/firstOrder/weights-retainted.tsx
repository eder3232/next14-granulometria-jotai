import TypographyH2 from '@/components/typography/typography-h2'
import React from 'react'
import SelectDecimals from '../secondOrder/select-decimals'
import GranulometriaTable from '../secondOrder/granulometria-table'

const WeightsRetained = () => {
  return (
    <div>
      <TypographyH2>3. Calcula los pesos retenidos y acumulados:</TypographyH2>

      <p>Llena los pesos retenidos en cada tamiz.</p>

      <div>
        <p>
          Puedes cambiar el númmero de decimales mostrados en la tabla aqui:
        </p>
        <SelectDecimals />
      </div>

      <GranulometriaTable />
    </div>
  )
}

export default WeightsRetained
