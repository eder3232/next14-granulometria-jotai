import TypographyH2 from '@/components/typography/typography-h2'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import ListMeshes from '../secondOrder/list-meshes'

const SelectedMeshes = () => {
  return (
    <div>
      <TypographyH2>1. Selecciona los tamices a usar:</TypographyH2>
      <div className="my-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-min font-bold text-xl" size="lg">
              Seleccionar mallas
            </Button>
          </DialogTrigger>
          <DialogContent className="h-96">
            <DialogHeader>
              <DialogTitle>Mallas ASTM</DialogTitle>
              <DialogDescription>
                Selecciona las mallas que deseas agregar:
              </DialogDescription>
            </DialogHeader>
            <ListMeshes />
          </DialogContent>
        </Dialog>
      </div>

      <p>
        Estos son los tamices normados ASTM, si deseas agregar alguno adicional
        puedes hacerlo directamente en la tabla.
      </p>
    </div>
  )
}

export default SelectedMeshes
