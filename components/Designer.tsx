"use client";

import React, { useState } from "react";
import DesignerSideBar from "./DesignerSideBar";
import {
  DragEndEvent,
  useDndMonitor,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
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
  const {
    elements,
    addElement,
    selectedElement,
    setSelectedElement,
    deleteElement,
  } = useDesigner();
  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      // -----------Three scenario to achieve while drag and drop sidebar elements and designer elements-----------
      // (1)[SideBarElement Drag and Drop to Designer area which should be in order]
      // (2)[Drag the SidebarElement  over/between the designer Element]
      // (3)[Drag the designer element over/between other designer element]

      const { active, over } = event;
      console.log(event, over);

      if (!active || !over) return;

      //(1) First scenario
      const isDroppingOverDesignerArea = over.data.current?.isDesignerDropArea;
      const isDesignedBtnElement = active.data.current?.isDesignedBtnElement;

      const isSidebarBtnElementDroppingOverDesignerArea =
        isDroppingOverDesignerArea && isDesignedBtnElement;

      if (isSidebarBtnElementDroppingOverDesignerArea) {
        const type = active.data.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          idGenerator()
        );
        addElement(elements.length, newElement);
        return;
      }

      //Second Scenario
      const isDroppingOverDesignerElementTopHalf =
        over.data.current?.isTopHalfDesignerElement;
      const isDroppingOverDesignerElementBottomHalf =
        over.data.current?.isBottomHalfDesignerElement;

      const isDroppingOverDesignerElement =
        isDroppingOverDesignerElementTopHalf ||
        isDroppingOverDesignerElementBottomHalf;

      const isDroppingSideBarBtnOverDesignerElement =
        isDesignedBtnElement && isDroppingOverDesignerElement;

      if (isDroppingSideBarBtnOverDesignerElement) {
        const type = active.data.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          idGenerator()
        );
        const overId = over.data.current?.elementId;

        const overElementIndex = elements.findIndex((el) => el.id === overId);
        if (overElementIndex === -1) {
          throw new Error("Element Not Found");
        }

        let indexForNewElement = overElementIndex;

        if (isDroppingOverDesignerElementBottomHalf) {
          indexForNewElement = overElementIndex + 1;
        }

        addElement(indexForNewElement, newElement);
        return;
      }

      //Third Scenario
      const isDraggingDesignerElement = active.data.current?.isDesignerElement;
      const isDraggingDesignerElementOverOtherElement =
        isDraggingDesignerElement && isDroppingOverDesignerElement;
      if (isDraggingDesignerElementOverOtherElement) {
        const activeId = active.data.current?.elementId;
        const overId = over.data.current?.elementId;

        const activeElementIndex = elements.findIndex(
          (el) => el.id === activeId
        );
        const overElementIndex = elements.findIndex((el) => el.id === overId);

        if (activeElementIndex === -1 || overElementIndex === -1) {
          throw new Error("Element not Found");
        }
        const activeElement = { ...elements[activeElementIndex] };
        console.log(activeElement, "active Element");

        deleteElement(activeId);

        let indexForNewElement = overElementIndex;

        if (isDroppingOverDesignerElementBottomHalf) {
          indexForNewElement = overElementIndex + 1;
        }

        addElement(indexForNewElement, activeElement);
      }
    },
  });

  console.log(elements);

  return (
    <div className="flex w-full h-full">
      <div
        className="p-4 w-full"
        onClick={() => {
          if (selectedElement) setSelectedElement(null);
        }}
      >
        <div
          ref={droppable.setNodeRef}
          className={`bg-background max-w-full h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto ${
            droppable.isOver && "ring-4 ring-primary"
          }`}
        >
          {!droppable.isOver && !(elements.length > 0) && (
            <p className="text-md md:text-3xl text-muted-foreground flex flex-grow items-center font-bold">
              Drop Here
            </p>
          )}
          {droppable.isOver && !(elements.length > 0) && (
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
  const { deleteElement, selectedElement, setSelectedElement } = useDesigner();
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

  const draggable = useDraggable({
    id: element.id + "-drag-handler",
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  });

  if (draggable.isDragging) return;

  console.log("SELECTED EL", selectedElement);

  const DesignerElement = FormElements[element.type].designerComponent;
  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      className="relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset"
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement(element);
      }}
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
              onClick={(e) => {
                e.stopPropagation();
                deleteElement(element.id);
              }}
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
      {topHalf.isOver && (
        <div className="absolute top-0 w-full rounded-md h-[7px] bg-primary rounded-b-none"></div>
      )}
      <div
        className={`flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none ${
          mouseIsOver && "opacity-30"
        }`}
      >
        <DesignerElement elementInstance={element} />
      </div>
      {bottomHalf.isOver && (
        <div className="absolute bottom-0 w-full rounded-md h-[7px] bg-primary rounded-t-none"></div>
      )}
    </div>
  );
}

export default Designer;
