import React, { useTransition } from "react";
import { Button } from "./ui/button";
import { Loader2, Save } from "lucide-react";
import useDesigner from "@/hooks/useDesigner";
import { toast } from "./ui/use-toast";
import { UpdateFormContent } from "@/actions/form";

function SaveFormBtn({ id }: { id: number }) {
  const { elements } = useDesigner();
  const [loading, startTransition] = useTransition();

  const updateFormContent = async () => {
    try {
      const jsonElements = JSON.stringify(elements);
      await UpdateFormContent(id, jsonElements);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
      });
    }
  };

  return (
    <Button
      className="gap-2"
      variant={"outline"}
      disabled={loading}
      onClick={() => startTransition(updateFormContent)}
    >
      <Save className="h-4 w-4" />
      Save
      {loading && <Loader2 className="animate-spin" />}
    </Button>
  );
}

export default SaveFormBtn;