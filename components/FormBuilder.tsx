"use client";

import { Form } from "@prisma/client";
import React from "react";
import PreviewDialogueBtn from "./PreviewDialogueBtn";
import SaveFormBtn from "./SaveFormBtn";
import PublishedFormBtn from "./PublishedFormBtn";
import Designer from "./Designer";
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";

function FormBuilder({ form }: { form: Form }) {
  const mouseSensor =useSensor(MouseSensor,{
    activationConstraint:{
      distance:10
    }
  })

  const touchSensor =useSensor(TouchSensor,{
    activationConstraint:{
      delay:300,
      tolerance:5
    }
  })
  const sensors =useSensors(mouseSensor,touchSensor);

  return (
    <DndContext sensors={sensors}>
      <main className="flex flex-col w-full">
        <nav className="flex justify-between items-center border-b-2 p-4 ">
          <h2 className="truncate font-semibold">
            <span className="text-muted-foreground mr-2">Form:</span>
            {form.name}
          </h2>
          <div className="flex items-center gap-2">
            <PreviewDialogueBtn />
            {!form.publishedAt && (
              <>
                <SaveFormBtn />
                <PublishedFormBtn />
              </>
            )}
          </div>
        </nav>
        <div className="flex justify-center items-center relative w-full flex-grow overflow-y-auto h-[200px] bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
          <Designer />
        </div>
      </main>
    </DndContext>
  );
}

export default FormBuilder;
