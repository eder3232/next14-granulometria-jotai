import { atomGetDecimals, atomSetDecimals } from '@/app/_store/decimals'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAtom } from 'jotai'

const SelectDecimals = () => {
  const [decimals] = useAtom(atomGetDecimals)
  const [, onDecimalsChange] = useAtom(atomSetDecimals)
  return (
    <div>
      <Select
        value={decimals.toString()}
        onValueChange={(e) => onDecimalsChange(+e)}
      >
        <SelectTrigger className="w-24">
          <SelectValue placeholder="Número de decimales" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Número de decimales</SelectLabel>
            <SelectItem value="0">0</SelectItem>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="4">4</SelectItem>
            <SelectItem value="5">5</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default SelectDecimals
