import { GetFromContentByURL } from "@/actions/form";
import { FormElementInstance } from "@/components/FormElements";
import FormSubmitComponent from "@/components/FormSubmitComponent";
import React from "react";

async function page({ params }: { params: { formURL: string } }) {
  const form = await GetFromContentByURL(params.formURL);

  if (!form) {
    throw new Error("Form not found");
  }

  const formContent = JSON.parse(form.content) as FormElementInstance[];

  return (
    <FormSubmitComponent shareURL={params.formURL} content={formContent} />
  );
}

export default page;
