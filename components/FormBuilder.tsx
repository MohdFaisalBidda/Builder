"use client";

import { Form } from "@prisma/client";
import React, { useEffect, useState } from "react";
import PreviewDialogueBtn from "./PreviewDialogueBtn";
import SaveFormBtn from "./SaveFormBtn";
import PublishedFormBtn from "./PublishedFormBtn";
import Designer from "./Designer";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import useDesigner from "@/hooks/useDesigner";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import Confetti from "react-confetti";

function FormBuilder({ form }: { form: Form }) {
  const [isReady, setIsReady] = useState(false);
  const { setElements } = useDesigner();
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    if (isReady) return;
    const formElements = JSON.parse(form.content);
    setElements(formElements);
    const timeout = setTimeout(() => setIsReady(true), 500);
    return () => clearTimeout(timeout);
  }, [form, setElements]);

  if (!isReady) {
    return (
      <div className="flex flex-col justify-center items-center w-full h-full">
        <Loader2 className="animate-spin w-12 h-12" />
      </div>
    );
  }
  const shareURL = `${window.location.origin}/submit/${form.shareURL}`;

  if (form.published) {
    return (
      <>
      <Confetti height={window.innerHeight} width={window.innerWidth} recycle={false} numberOfPieces={500}/>
      <div className="flex flex-col justify-center items-center w-full h-full">
        <div>
          <h1 className="text-4xl text-center font-bold text-primary-foreground border-b border-secondary pb-2 mb-8">
          🚀🚀 Form Published 🚀🚀
          </h1>
          <h2 className="text-2xl">Share this form</h2>
          <h3 className="text-lg text-muted-foreground pb-14 border-b border-secondary">
            Anyone with the link can view your form
          </h3>
          <div className="my-4 flex flex-col gap-4 items-center w-full border-b border-secondary pb-4">
            <Input readOnly className="w-full" value={shareURL} />
            <Button
              onClick={() => navigator.clipboard.writeText(shareURL)}
              className="mt-2 border-b w-full"
            >
              Copy Link
            </Button>
          </div>
          <div className="flex justify-between items-center">
            <Button asChild variant={"link"}>
              <Link href={"/"}>
              <ArrowLeft/>
              Go back home
              </Link>
            </Button>
            <Button asChild variant={"link"}>
              <Link href={`/forms/${form.id}`}>
              Form Details 
              <ArrowRight/>
              </Link>
            </Button>
          </div>
        </div>
      </div>
      </>

    );
  }

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
            {!form.published && (
              <>
                <SaveFormBtn id={form.id} />
                <PublishedFormBtn id={form.id} />
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
