import React from "react";
import { FormElement } from "./FormElements";
import { Button } from "./ui/button";
import { useDraggable } from "@dnd-kit/core";

function SideBarBtnElement({ formElement }: { formElement: FormElement }) {
  const { icon: Icon, label } = formElement.designerBtnElement;

  const draggable = useDraggable({
    id: `designer-btn-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignedBtnElement: true,
    },
  });
  return (
    <Button
      ref={draggable.setNodeRef}
      variant={"outline"}
      className={`flex flex-col gap-2 h-[120px] w-[120px] text-muted-foreground cursor-grab ${
        draggable.isDragging && "ring-2 ring-primary"
      }`}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <Icon className="w-8 h-8 text-primary cursor-grab" />
      <p className="text-sm">{label}</p>
    </Button>
  );
}

export function SideBarBtnDragOverlay({
  formElement,
}: {
  formElement: FormElement;
}) {
  const { icon: Icon, label } = formElement.designerBtnElement;
  return (
    <Button
      variant={"outline"}
      className={`flex flex-col gap-2 h-[120px] w-[120px] text-muted-foreground cursor-grab`}
    >
      <Icon className="w-8 h-8 text-primary cursor-grab" />
      <p className="text-sm">{label}</p>
    </Button>
  );
}

export default SideBarBtnElement;
