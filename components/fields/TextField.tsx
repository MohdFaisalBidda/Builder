"use client";
import { TiSortAlphabeticallyOutline } from "react-icons/ti";
import { ElementsType, FormElement } from "../FormElements";

const type: ElementsType = "TextField";

export const TextFieldFormElement: FormElement = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      label: "Text Field",
      helperText: "Helper Text",
      require: true,
      placeholder: "Enter Value Here...",
    },
  }),

  designerBtnElement: {
    icon: TiSortAlphabeticallyOutline,
    label: "Text",
  },
  designerComponent: () => <div>Desinger Comp</div>,
  formComponent: () => <div>Desinger Comp</div>,
  propertiesComponent: () => <div>Desinger Comp</div>,
};
