import React from 'react'
import { FormElements } from './FormElements'
import SideBarElements from './SideBarElements'

function DesignerSideBar() {
  return (
    <aside className='flex flex-col w-[400px] max-w-[400px] flex-grow gap-2 border-l-2 h-full bg-background overflow-y-auto border-muted p-4'>
      Elements
      <SideBarElements formElement={FormElements.TextField}/>
    </aside>
  )
}

export default DesignerSideBar
