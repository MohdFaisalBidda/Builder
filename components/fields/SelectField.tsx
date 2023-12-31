"use client";
import { RxDropdownMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
  SubmitFunction,
} from "../FormElements";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import useDesigner from "@/hooks/useDesigner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "../ui/switch";
import { PlusCircle } from "lucide-react";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "../ui/select";
import { TiPlusOutline } from "react-icons/ti";
import { Separator } from "../ui/separator";
import { toast } from "../ui/use-toast";

const type: ElementsType = "SelectField";

const extraAttributes = {
  label: "Select Field",
  helperText: "Helper Text",
  require: false,
  placeholder: "Value Here...",
  options: [],
};

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().min(2).max(200),
  require: z.boolean().default(false),
  placeholder: z.string().max(50),
  options: z.array(z.string()).default([]),
});

export const SelectFieldFormElement: FormElement = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),

  designerBtnElement: {
    icon: RxDropdownMenu,
    label: "Select",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: (formElement: FormElementInstance, currentVaue: string) => {
    const element = formElement as CustomInstance;
    if (element.extraAttributes.require) {
      return currentVaue.length > 0;
    }

    return true;
  },
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

type PropertiesFormSchemaType = z.infer<typeof propertiesSchema>;

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { label, require, placeholder, helperText, options } =
    element.extraAttributes;
  return (
    <div className="flex gap-4 flex-col w-full">
      <Label>
        {label}
        {require && "*"}
      </Label>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </Select>
      {helperText && (
        <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
      )}
    </div>
  );
}

function FormComponent({
  elementInstance,
  submitValues,
  isInvalid,
  defaultValue,
}: {
  elementInstance: FormElementInstance;
  submitValues?: SubmitFunction;
  isInvalid?: boolean;
  defaultValue?: string;
}) {
  const element = elementInstance as CustomInstance;
  const { label, require, placeholder, helperText, options } =
    element.extraAttributes;
  const [value, setValue] = useState(defaultValue || "");
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  return (
    <div className="flex gap-4 flex-col w-full">
      <Label className={`${error && "text-red-500"}`}>
        {label}
        {require && "*"}
      </Label>
      <Select
      defaultValue={value}
        onValueChange={(value) => {
          setValue(value);
          if (!submitValues) return;
          const valid = SelectFieldFormElement.validate(element, value);
          setError(!valid);
          submitValues(element.id, value);
        }}
      >
        <SelectTrigger className={`w-full ${error && "border-red-500"}`}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((op) => (
            <SelectItem key={op} value={op}>
              {op}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {helperText && (
        <p
          className={`text-muted-foreground text-[0.8rem] ${
            error && "text-red-500"
          }`}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}

function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const { updateElement,setSelectedElement } = useDesigner();
  const element = elementInstance as CustomInstance;
  const form = useForm<PropertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: "onSubmit",
    defaultValues: {
      label: element.extraAttributes.label,
      helperText: element.extraAttributes.helperText,
      require: element.extraAttributes.require,
      placeholder: element.extraAttributes.placeholder,
      options: [""],
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  const applyChanges = (values: PropertiesFormSchemaType) => {
    updateElement(element.id, {
      ...element,
      extraAttributes: { ...values },
    });

    toast({
      title:"Success",
      description:"Properties saved successfully !"
    })
    setSelectedElement(null);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(applyChanges)}
        className="space-y-3"
      >
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input
                  onKeyDown={(e) => {
                    if (e.key == "Enter") {
                      e.currentTarget.blur();
                    }
                  }}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The Label of field <br />
                It will be displayed above the field
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="placeholder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input
                  onKeyDown={(e) => {
                    if (e.key == "Enter") {
                      e.currentTarget.blur();
                    }
                  }}
                  {...field}
                />
              </FormControl>
              <FormDescription>The Placeholder field</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="helperText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input
                  onKeyDown={(e) => {
                    if (e.key == "Enter") {
                      e.currentTarget.blur();
                    }
                  }}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The helper text of field <br />
                It will be displayed below the field
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <FormField
          control={form.control}
          name="options"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel>Options</FormLabel>
                <Button
                  variant={"outline"}
                  className="gap-2"
                  onClick={(e) => {
                    e.preventDefault();
                    form.setValue("options", field.value.concat("New Option"));
                  }}
                >
                  <PlusCircle className="h-4 w-4" /> Add
                </Button>
              </div>
              <div className="flex flex-col gap-2">
                {form.watch("options").map((op, index) => (
                  <div key={index} className="flex items-center gap-1 justify-between">
                    <Input
                      placeholder=""
                      value={op}
                      onChange={(e) => {
                        field.value[index] = e.target.value;
                        field.onChange(field.value);
                      }}
                    />
                    <Button
                      variant={"ghost"}
                      size={"icon"}
                      onClick={(e) => {
                        e.preventDefault();
                        const newOpFields = [...field.value];
                        newOpFields.splice(index, 1);
                        field.onChange(newOpFields);
                      }}
                    >
                      <IoMdClose />
                    </Button>
                  </div>
                ))}
              </div>
              <FormDescription>
                The helper text of field <br />
                It will be displayed below the field
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="require"
          render={({ field }) => (
            <FormItem className="flex justify-between items-center rounded-lg border p-3 shadow-md">
              <div className="space-x-0.5">
                <FormLabel>Label</FormLabel>
                <FormDescription>
                  The required check for the <br />
                  text field.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Separator />
        <Button className="w-full" type="submit">
          Save
        </Button>
      </form>
    </Form>
  );
}
