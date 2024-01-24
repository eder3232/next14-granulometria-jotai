import { atomGetDecimals } from '@/app/_store/decimals'
import { atomGetIsThereLossedMaterial } from '@/app/_store/lossedMaterial'
import {
  atomGetMeshesData,
  atomGetMeshesResults,
  atomSetMeshesChangeNumberField,
  atomSetMeshesChangeStringField,
  atomSetMeshesDelete,
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

const GranulometriaTable = () => {
  const [isThereLossMaterial] = useAtom(atomGetIsThereLossedMaterial)

  const [meshesData] = useAtom(atomGetMeshesData)

  const [meshesDataResults] = useAtom(atomGetMeshesResults)

  const [decimals] = useAtom(atomGetDecimals)

  const [, onInputTableChangeString] = useAtom(atomSetMeshesChangeStringField)

  const [, onInputTableChangeNumber] = useAtom(atomSetMeshesChangeNumberField)

  const [, onInsertRow] = useAtom(atomSetMeshesInsert)

  const [, onRemoveRow] = useAtom(atomSetMeshesDelete)

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
                    onClick={() => onRemoveRow({ index: index })}
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

                {/* Results */}

                {isThereLossMaterial &&
                  meshesDataResults.length === meshesData.length && (
                    <TableCell className="text-center eder-result">
                      {meshesDataResults[index].pesoCorregido.toFixed(decimals)}
                    </TableCell>
                  )}

                {/* Se muestra un guion si los la longitud de los resultados no coinciden con la longitud de la data, ocurre cuando se agrega o elimina una fila.
                 */}
                {isThereLossMaterial &&
                  meshesDataResults.length !== meshesData.length && (
                    <TableCell className="text-center eder-result">-</TableCell>
                  )}

                {meshesDataResults.length === meshesData.length && (
                  <TableCell className="text-center eder-result">
                    {meshesDataResults[index].retenido.toFixed(decimals)}
                  </TableCell>
                )}

                {meshesDataResults.length !== meshesData.length && (
                  <TableCell className="text-center eder-result">-</TableCell>
                )}

                {meshesDataResults.length === meshesData.length && (
                  <TableCell className="text-center eder-result">
                    {meshesDataResults[index].retenidoAcumulado.toFixed(
                      decimals
                    )}
                  </TableCell>
                )}

                {meshesDataResults.length !== meshesData.length && (
                  <TableCell className="text-center eder-result">-</TableCell>
                )}

                {meshesDataResults.length === meshesData.length && (
                  <TableCell className="text-center eder-result">
                    {meshesDataResults[index].pasante.toFixed(decimals)}
                  </TableCell>
                )}

                {meshesDataResults.length !== meshesData.length && (
                  <TableCell className="text-center eder-result">-</TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default GranulometriaTable
