import { Loader2 } from 'lucide-react'
import React from 'react'

function loading() {
  return (
    <div className='flex items-center justify-center w-full h-screen'>
      <Loader2 className='h-12 w-12 animate-spin'/>
    </div>
  )
}

export default loading
