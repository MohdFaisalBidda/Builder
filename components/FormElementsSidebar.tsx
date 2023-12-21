import React from "react";
import SideBarBtnElement from "./SideBarElements";
import { FormElements } from "./FormElements";

function FormElementsSidebar() {
  return (
    <div>
      <SideBarBtnElement formElement={FormElements.TextField} />
    </div>
  );
}

export default FormElementsSidebar;
