"use client"

import React from "react";
import { FormElementInstance, FormElements } from "./FormElements";
import { Button } from "./ui/button";

function FormSubmitComponent({
  shareURL,
  content,
}: {
  shareURL: string;
  content: FormElementInstance[];
}) {
  return (
    <div className="flex justify-center h-full w-full items-center p-8">
      <div className="max-w-[640px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-violet-700 rounded">
        {content.map((ele) => {
          const FormElement = FormElements[ele.type].formComponent;
          return <FormElement key={ele.id} elementInstance={ele} />;
        })}
        <Button>Submit</Button>
      </div>
    </div>
  );
}

export default FormSubmitComponent;
