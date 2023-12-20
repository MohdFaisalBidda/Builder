import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import React, { useState } from "react";
import { SideBarBtnDragOverlay } from "./SideBarElements";
import { ElementsType, FormElements } from "./FormElements";
import useDesigner from "@/hooks/useDesigner";

function DragOverlayWrapper() {
  const { elements } = useDesigner();
  const [draggableItem, setDraggableItem] = useState<Active | null>(null);
  useDndMonitor({
    onDragStart: (event) => {
      setDraggableItem(event.active);
    },
    onDragCancel: () => {
      setDraggableItem(null);
    },
    onDragEnd: () => {
      setDraggableItem(null);
    },
  });

  let node = <div>Overlay item</div>;
  if (!draggableItem) return null;
  let isSideBarBtnElement = draggableItem?.data?.current?.isDesignedBtnElement;

  if (isSideBarBtnElement) {
    const type = draggableItem.data.current?.type as ElementsType;
    node = <SideBarBtnDragOverlay formElement={FormElements[type]} />;
  }

  let isDraggableElement = draggableItem.data.current?.isDesignerElement;
  if (isDraggableElement) {
    const elementId = draggableItem.data.current?.elementId;
    const element = elements.find((el) => el.id === elementId);
    if (!element) node = <div>Element Not Found</div>;
    else {
      const DesignerElementComponent =
        FormElements[element.type].designerComponent;
      node = <div className="flex w-full h-[120px] border rounded-md bg-accent px-4 py-2 opacity-80 pointer-events-none">
        <DesignerElementComponent elementInstance={element} />
      </div>;
    }
  }

  return <DragOverlay>{node}</DragOverlay>;
}

export default DragOverlayWrapper;
