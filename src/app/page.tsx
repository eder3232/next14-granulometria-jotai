'use client'

import TypographyH1 from '@/components/typography/typography-h1'
import SelectedMeshes from './_components/firstOrder/selected-meshes'

export default function Home() {
  return (
    <main>
      <div className="mt-6">
        <TypographyH1>Granulometría</TypographyH1>

        <p>Porfavor llena los siguientes datos en orden:</p>
        <SelectedMeshes />
      </div>
    </main>
  )
}
