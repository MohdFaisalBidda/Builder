import React from "react";
import { Button } from "./ui/button";
import { EyeIcon } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import useDesigner from "@/hooks/useDesigner";
import { FormElements } from "./FormElements";

function PreviewDialogueBtn() {
  const { elements } = useDesigner();
  return (
    <div className="w-full">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="gap-2" variant={"outline"}>
            <EyeIcon className="h-4 w-4" />
            Preview
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-full h-screen max-h-screen flex flex-col flex-grow p-0 gap-0">
          <div className="px-4 py-2 border-b">
            <p className="text-lg font-bold text-muted-foreground">
              Form Preview
            </p>
            <p className="text-sm text-muted-foreground">
              This is how your form will look like.
            </p>
          </div>
          <div className="bg-accent flex flex-col flex-grow items-center justify-center p-4">
            <div className="max-w-[640px] flex flex-col gap-4 flex-grow bg-background h-full w-full rounded-2xl p-8 overflow-y-auto">
              {elements.map((ele) => {
                const FormComponent = FormElements[ele.type].formComponent;
                return <FormComponent key={ele.id} elementInstance={ele}/>;
              })}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PreviewDialogueBtn;
