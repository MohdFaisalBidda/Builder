"use client";
import { TiSortAlphabeticallyOutline } from "react-icons/ti";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "../FormElements";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const type: ElementsType = "TextField";

const extraAttributes = {
  label: "Text Field",
  helperText: "Helper Text",
  require: false,
  placeholder: "Enter Value Here...",
};

export const TextFieldFormElement: FormElement = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),

  designerBtnElement: {
    icon: TiSortAlphabeticallyOutline,
    label: "Text",
  },
  designerComponent: DesignerComponent,
  formComponent: () => <div>Desinger Comp</div>,
  propertiesComponent: () => <div>Desinger Comp</div>,
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { label, require,placeholder,helperText } = element.extraAttributes;
  return (
    <div className="flex gap-4 flex-col w-full">
      <Label>
        {label}
        {require && "*"}
      </Label>
      <Input readOnly disabled placeholder={placeholder} className="bg-transparent"/>
      {helperText && (<p className="text-muted-foreground text-[0.8rem]">{helperText}</p>)}
    </div>
  );
}
