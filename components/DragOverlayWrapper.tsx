import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import React, { useState } from "react";
import { SideBarBtnDragOverlay } from "./SideBarElements";
import { ElementsType, FormElements } from "./FormElements";

function DragOverlayWrapper() {
  const [draggableItem,setDraggableItem]=useState<Active | null>(null);
  useDndMonitor({
    onDragStart: (event) => {
      setDraggableItem(event.active)
    },
    onDragCancel:()=>{
      setDraggableItem(null)
    },
    onDragEnd:()=>{
      setDraggableItem(null);
    }
  });

  let node =<div>Overlay item</div>;
  if(!draggableItem) return null;
   let isSideBarBtnElement =draggableItem?.data?.current?.isDesignedBtnElement;

   if(isSideBarBtnElement){
    const type =draggableItem.data.current?.type as ElementsType;
    node = <SideBarBtnDragOverlay formElement={FormElements[type]}/>
  }
  
  return <DragOverlay>{node}</DragOverlay>;
}

export default DragOverlayWrapper;
