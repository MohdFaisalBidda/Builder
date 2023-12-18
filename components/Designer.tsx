"use client";

import React, { useState } from "react";
import DesignerSideBar from "./DesignerSideBar";
import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core";
import DragOverlayWrapper from "./DragOverlayWrapper";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
  FormElements,
} from "./FormElements";
import idGenerator from "@/lib/idGenerator";
import useDesigner from "@/hooks/useDesigner";
import { Button } from "./ui/button";
import { LiaTrashSolid } from "react-icons/lia";

function Designer() {
  const { elements, addElement, deleteElement } = useDesigner();
  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) return;
      const isDesignedBtnElement = active.data.current?.isDesignedBtnElement;
      if (isDesignedBtnElement) {
        const type = active.data.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          idGenerator()
        );
        addElement(0, newElement);
      }
    },
  });

  console.log(elements);

  return (
    <div className="flex w-full h-full">
      <div className="p-4 w-full">
        <div
          ref={droppable.setNodeRef}
          className={`bg-background max-w-full h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto ${
            droppable.isOver && "ring-2 ring-primary/20"
          }`}
        >
          {!droppable.isOver && !(elements.length > 0) && (
            <p className="text-md md:text-3xl text-muted-foreground flex flex-grow items-center font-bold">
              Drop Here
            </p>
          )}
          {droppable.isOver && (
            <div className="p-4 w-full">
              <div className="h-[120px] rounded-md bg-primary/20"></div>
            </div>
          )}
          {elements.length > 0 &&
            elements.map((element) => (
              <div className="flex flex-col w-full gap-2 p-4">
                <DesignerElementWrapper key={element.id} element={element} />
              </div>
            ))}
        </div>
      </div>
      <DragOverlayWrapper />
      <DesignerSideBar />
    </div>
  );
}

function DesignerElementWrapper({ element }: { element: FormElementInstance }) {
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);
  const { deleteElement } = useDesigner();
  const topHalf = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    },
  });

  const bottomHalf = useDroppable({
    id: element.id + "-bottom",
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true,
    },
  });

  const DesignerElement = FormElements[element.type].designerComponent;
  return (
    <div
      className="relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset"
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
    >
      <div
        ref={topHalf.setNodeRef}
        className="absolute h-1/2 w-full rounded-t-md"
      />
      <div
        ref={bottomHalf.setNodeRef}
        className="absolute h-1/2 bottom-0 w-full rounded-b-md"
      />
      {mouseIsOver && (
        <>
          <div className="absolute right-0 h-full">
            <Button
              onClick={() => {console.log(element.id);
              deleteElement(element.id)}}
              className="flex justify-center h-full border rounded-md rounded-l-none bg-red-500"
              variant={"outline"}
            >
              <LiaTrashSolid className="w-6 h-6" />
            </Button>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
            <p className="text-muted-foreground text-sm">
              Click to add Properties OR drag to move
            </p>
          </div>
        </>
      )}
      <div
        className={`flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none ${
          mouseIsOver && "opacity-30"
        }`}
      >
        <DesignerElement elementInstance={element} />
      </div>
    </div>
  );
}

export default Designer;
