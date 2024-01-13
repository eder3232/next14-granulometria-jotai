import { atomGetExample, atomSetExampleInsertZero } from '@/app/_store/example'
import { useAtom } from 'jotai'
import React from 'react'

const Example = () => {
  const [example] = useAtom(atomGetExample)
  const [, setExampleInsertZero] = useAtom(atomSetExampleInsertZero)
  return (
    <div>
      {example.map((item, index) => (
        <div key={index}>{item}</div>
      ))}

      <button onClick={() => setExampleInsertZero()}>Insertar 0</button>
    </div>
  )
}

export default Example
