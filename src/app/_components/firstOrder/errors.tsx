import { atomGetErrors } from '@/app/_store/errors'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { cn } from '@/lib/utils'
import { useAtom } from 'jotai'
import { AlertCircle } from 'lucide-react'
import React from 'react'

const Errors = () => {
  const [errors] = useAtom(atomGetErrors)
  return (
    <div>
      {errors.map((error, index) => (
        // <div
        //   key={index}
        //   className={cn('p-4 border', {
        //     'bg-warning': error.severity === 'warning',
        //   })}
        // >
        //   {error.message}
        // </div>

        <Alert key={index} variant={error.severity}>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{error.name}</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      ))}
    </div>
  )
}

export default Errors
