"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { LiaSpinnerSolid } from "react-icons/lia";
import { toast } from "./ui/use-toast";
import { formSchema, formSchemaType } from "@/schema/form";
import { CreateForm } from "@/actions/form";
import { FileImage } from "lucide-react";
import { useRouter } from "next/navigation";

function CreateFormButton() {
  const router =useRouter();
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: formSchemaType) {
    try {
      const formId = await CreateForm(values);
      toast({
        title: "Success",
        description: "Form Created Successfully!",
      });
      console.log(formId);
      router.push(`/builder/${formId}`)
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong, Please try again later!",
        variant: "destructive",
      });
    }
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"outline"} className="group border-2 border-primary/20 h-[190px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4">
            <FileImage className="h-8 w-8 text-muted-foreground group-hover:text-primary"/>
            <p className="font-bold text-xl text-muted-foreground group-hover:text-primary">
            Create New Form
            </p>
            </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Form</DialogTitle>
            <DialogDescription>
              Create a new Form for responses!
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea rows={5} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <DialogFooter>
            <Button
              onClick={form.handleSubmit(onSubmit)}
              disabled={form.formState.isSubmitting}
              className="w-full mt-4"
            >
              {!form.formState.isSubmitting ? (
                <span>Save</span>
              ) : (
                <LiaSpinnerSolid className="animate-spin w-10 h-10" />
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CreateFormButton;
