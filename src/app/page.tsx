'use client'

import TypographyH1 from '@/components/typography/typography-h1'
import SelectedMeshes from './_components/firstOrder/selected-meshes'
import LossedMaterial from './_components/firstOrder/lossed-material'

export default function Home() {
  return (
    <main>
      <div className="mt-6 flex gap-4 flex-col">
        <TypographyH1>Granulometría</TypographyH1>

        <p>Porfavor llena los siguientes datos en orden:</p>
        <SelectedMeshes />

        <LossedMaterial />
      </div>
    </main>
  )
}
