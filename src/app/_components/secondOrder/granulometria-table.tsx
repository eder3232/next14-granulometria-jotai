import { atomGetIsThereLossedMaterial } from '@/app/_store/lossedMaterial'
import {
  atomGetMeshesData,
  atomSetMeshesChangeNumberField,
  atomSetMeshesChangeStringField,
  atomSetMeshesInsert,
} from '@/app/_store/meshesData'
import { meshFinder } from '@/app/_utils/meshFinder'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { useAtom } from 'jotai'
import { MinusCircle, PlusCircle } from 'lucide-react'
import React from 'react'

const GranulometriaTable = () => {
  const [isThereLossMaterial] = useAtom(atomGetIsThereLossedMaterial)

  const [meshesData] = useAtom(atomGetMeshesData)

  const [, onInputTableChangeString] = useAtom(atomSetMeshesChangeStringField)

  const [, onInputTableChangeNumber] = useAtom(atomSetMeshesChangeNumberField)

  const [, onInsertRow] = useAtom(atomSetMeshesInsert)

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
              <TableHead className="eder-head-text">% Pasante</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {meshesData.map((mesh, index) => (
              <TableRow
                key={mesh.id}
                className={cn(
                  '[&>*]:py-1 [&>*]:px-1',
                  '[&>.eder-result]:text-right'
                )}
              >
                <TableCell className="text-center">
                  <button
                    onClick={() =>
                      onInsertRow({
                        mesh: meshFinder(
                          meshesData[index].iso,
                          meshesData[index + 1].iso
                        ),
                        index: index + 1,
                      })
                    }
                    disabled={index === meshesData.length - 1}
                    className={cn(
                      'text-primary disabled:text-muted-foreground'
                    )}
                  >
                    <PlusCircle className="m-auto" />
                  </button>
                </TableCell>

                <TableCell className="px-1 text-center">
                  <button
                    onClick={() => console.log('raa -')}
                    disabled={index === 0}
                    className={cn(
                      'text-primary disabled:text-muted-foreground'
                    )}
                  >
                    <MinusCircle className="m-auto" />
                  </button>
                </TableCell>

                <TableCell className="text-left whitespace-nowrap">
                  <Input
                    type="text"
                    defaultValue={mesh.astm}
                    className="w-32"
                    onBlur={(e) =>
                      onInputTableChangeString({
                        value: e.target.value,
                        index: index,
                        field: 'astm',
                      })
                    }
                  />
                </TableCell>

                <TableCell className="text-center">
                  <Input
                    type="number"
                    defaultValue={mesh.iso}
                    className="w-32"
                    step={0.01}
                    onBlur={(e) =>
                      onInputTableChangeNumber({
                        value: e.target.valueAsNumber,
                        index: index,
                        field: 'iso',
                      })
                    }
                  />
                </TableCell>

                <TableCell className="text-center">
                  <Input
                    type="number"
                    defaultValue={mesh.weight}
                    className="w-32"
                    step={0.1}
                    onBlur={(e) =>
                      onInputTableChangeNumber({
                        value: e.target.valueAsNumber,
                        index: index,
                        field: 'weight',
                      })
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default GranulometriaTable
