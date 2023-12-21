import React from "react";
import useDesigner from "@/hooks/useDesigner";
import FormElementsSidebar from "./FormElementsSidebar";
import PropertiesFormSideBar from "./PropertiesFormSideBar";

function DesignerSideBar() {
  const { selectedElement } = useDesigner();
  return (
    <aside className="flex flex-col w-[400px] max-w-[400px] flex-grow gap-2 border-l-2 h-full bg-background overflow-y-auto border-muted p-4">
      {!selectedElement && <FormElementsSidebar />}
      {selectedElement && <PropertiesFormSideBar/>}
    </aside>
  );
}

export default DesignerSideBar;
