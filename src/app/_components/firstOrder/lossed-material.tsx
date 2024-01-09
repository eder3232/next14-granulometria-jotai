import {
  atomGetCompleteWeight,
  atomGetIsThereLossedMaterial,
  atomSetCompleteWeight,
  atomSetSwitchLossedMaterial,
} from '@/app/_store/lossedMaterial'
import TypographyH2 from '@/components/typography/typography-h2'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useAtom } from 'jotai'

const LossedMaterial = () => {
  const [isThereLossMaterial] = useAtom(atomGetIsThereLossedMaterial)
  const [, switchLossMaterial] = useAtom(atomSetSwitchLossedMaterial)

  const [completeWeight] = useAtom(atomGetCompleteWeight)
  const [, onCompleteWeightChange] = useAtom(atomSetCompleteWeight)

  return (
    <div>
      <TypographyH2>2. Pesos retenidos:</TypographyH2>

      <p>
        Si el peso total de las mallas es menor del peso inicial, es decir, se
        ha perdido material, se debe hacer una corrección al peso total de las
        mallas, de lo contrario, ignora este paso.
      </p>

      <div>
        <p>¿Se ha perdido material durante el tamizado?</p>
        <div className="flex gap-2 items-center">
          <p>Si</p>
          <Checkbox
            checked={isThereLossMaterial}
            onCheckedChange={() => switchLossMaterial()}
          />
          <p>No</p>
          <Checkbox
            checked={!isThereLossMaterial}
            onCheckedChange={() => switchLossMaterial()}
          />
        </div>

        <div
          className={cn('flex gap-4 items-center', {
            hidden: !isThereLossMaterial,
          })}
        >
          <p>¿Cuánto era el peso inicial?</p>
          <Input
            type="number"
            className="w-32 text-right"
            placeholder="Peso total de las mallas"
            step="0.1"
            defaultValue={completeWeight}
            onBlur={(e) => onCompleteWeightChange(e.target.valueAsNumber)}
          />
        </div>
      </div>
    </div>
  )
}

export default LossedMaterial
