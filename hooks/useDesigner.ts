"use client";

import { DesignerContext } from '@/context/DesignerContext';
import React, { useContext } from 'react'

function useDesigner() {
  const context =useContext(DesignerContext);

  if(!context){
    throw new Error("useDesigner should be used within the DesignerContext")
  }
  return context;
}

export default useDesigner
