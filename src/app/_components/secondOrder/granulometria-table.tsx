import { atomGetIsThereLossedMaterial } from '@/app/_store/lossedMaterial'
import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useAtom } from 'jotai'
import { MinusCircle, PlusCircle } from 'lucide-react'
import React from 'react'

const GranulometriaTable = () => {
  const [isThereLossMaterial] = useAtom(atomGetIsThereLossedMaterial)
  return (
    <div className="max-w-full overflow-x-auto overflow-y-visible lg:max-w-min">
      <div className="px-4 bg-muted rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="[&>*]:text-center [&>*]:py-2 [&>.eder-head-text]:font-bold">
              <TableHead className="text-primary">
                <PlusCircle className="m-auto" />
              </TableHead>
              <TableHead className="text-primary">
                <MinusCircle className="m-auto" />
              </TableHead>
              <TableHead className="eder-head-text">Tamiz</TableHead>
              <TableHead className="eder-head-text">Abertura</TableHead>
              <TableHead className="eder-head-text">Peso</TableHead>
              {isThereLossMaterial && (
                <TableHead className="eder-head-text">Peso corregido</TableHead>
              )}
              <TableHead className="eder-head-text">% Retenido</TableHead>
              <TableHead className="text-center eder-head-text">
                % Retenido Acumulado
              </TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      </div>
    </div>
  )
}

export default GranulometriaTable
