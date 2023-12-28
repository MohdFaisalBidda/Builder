"use client";
import { TbSeparator, TbSeparatorHorizontal } from "react-icons/tb";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "../FormElements";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

const type: ElementsType = "SeperatorField";

export const SeperatorFieldFormElement: FormElement = {
  type,

  construct: (id: string) => ({
    id,
    type,
  }),

  designerBtnElement: {
    icon: TbSeparator,
    label: "Seperator",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: () => true,
};

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  return (
    <div className="flex gap-4 flex-col w-full">
      <Label className="text-muted-foreground">Seperator Field</Label>
      <Separator />
    </div>
  );
}

function FormComponent() {
  return <Separator />;
}

function PropertiesComponent() {
  return <p>No Properties for this Element</p>;
}
