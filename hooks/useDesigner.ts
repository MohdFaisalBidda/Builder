"use client";

import { DesignerContext } from '@/context/DesignerContext';
import React, { useContext } from 'react'

function useDesigner() {
  if (typeof window === 'undefined') {
    // Server-side rendering or prerendering
    // Handle appropriately, e.g., provide default values or throw an error
    throw new Error("useDesigner should be used within the DesignerContext on the client side");
  }
  
  const context =useContext(DesignerContext);

  if(!context){
    throw new Error("useDesigner should be used within the DesignerContext")
  }
  return context;
}

export default useDesigner
