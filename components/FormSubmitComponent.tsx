"use client";

import React, { useCallback, useRef, useState, useTransition } from "react";
import { FormElementInstance, FormElements } from "./FormElements";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import { Loader2, Rocket } from "lucide-react";
import { SubmitForm } from "@/actions/form";

function FormSubmitComponent({
  shareURL,
  content,
}: {
  shareURL: string;
  content: FormElementInstance[];
}) {
  const formValues = useRef<{ [key: string]: string }>({});
  const formErrors = useRef<{ [key: string]: boolean }>({});
  const [render, setRender] = useState(new Date().getTime());

  const [submitted, setSubmitted] = useState(false);
  const [isPending, setTransition] = useTransition();

  const validateForm: () => boolean = useCallback(() => {
    for (const field of content) {
      const actualValues = formValues.current[field.id] || "";
      const valid = FormElements[field.type].validate(field, actualValues);

      if (!valid) {
        formErrors.current[field.id] = true;
      }
    }

    if (Object.keys(formErrors.current).length > 0) {
      return false;
    }
    return true;
  }, [content]);

  const submitValues = (key: string, value: string) => {
    formValues.current[key] = value;
  };

  const submitForm = async () => {
    formErrors.current = {};
    const validForm = validateForm();
    if (!validForm) {
      setRender(new Date().getTime());
      toast({
        title: "Error",
        description: "Please input correct values",
        variant: "destructive",
      });
      return;
    }

    try {
      const jsonContent = JSON.stringify(formValues.current);
      await SubmitForm(shareURL, jsonContent);
      setSubmitted(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }

    console.log("FORM Values", formValues.current);
  };

  if (submitted) {
    return (
      <div className="w-full h-full flex p-8 justify-center items-center">
        <div className="max-w-[640px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-violet-700 rounded">
          <h1 className="text-2xl font-bold">Form Submitted</h1>
          <p className="text-muted-foreground">
            Thank you for submitting the form, you can click the above icon to
            close this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center h-full w-full items-center p-8">
      <div
        key={render}
        className="max-w-[640px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-violet-700 rounded"
      >
        {content.map((ele) => {
          const FormElement = FormElements[ele.type].formComponent;
          return (
            <FormElement
              key={ele.id}
              elementInstance={ele}
              submitValues={submitValues}
              isInvalid={formErrors.current[ele.id]}
              defaultValue={formValues.current[ele.id]}
            />
          );
        })}
        <Button onClick={() => submitForm()}>
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              <Rocket className="h-4 w-4 mr-2" /> Submit
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export default FormSubmitComponent;
