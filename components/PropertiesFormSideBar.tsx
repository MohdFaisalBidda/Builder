import useDesigner from "@/hooks/useDesigner";
import React from "react";
import { FormElements } from "./FormElements";
import { Button } from "./ui/button";
import { IoCloseOutline } from "react-icons/io5";
import { Separator } from "./ui/separator";

function PropertiesFormSideBar() {
  const { selectedElement,setSelectedElement } = useDesigner();
  if (!selectedElement) return null;
  const PropertiesForm =
    FormElements[selectedElement?.type].propertiesComponent;
  return (
    <div className="flex flex-col p-2">
      <div className="flex justify-between items-center">
        <p className="text-sm text-foreground/70">{selectedElement.type} Properties</p>
        <Button size={"icon"} variant={"ghost"} onClick={()=>{
            setSelectedElement(null)
        }}>
          <IoCloseOutline className="h-5 w-5" />
        </Button>
      </div>
      <Separator className="mb-4"/>
      <PropertiesForm elementInstance={selectedElement}/>
    </div>
  );
}

export default PropertiesFormSideBar;
