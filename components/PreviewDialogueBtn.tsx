import React from "react";
import { Button } from "./ui/button";
import { EyeIcon } from "lucide-react";

function PreviewDialogueBtn() {
  return (
    <Button className="gap-2" variant={"outline"}>
      <EyeIcon className="h-4 w-4" />
      Preview
    </Button>
  );
}

export default PreviewDialogueBtn;
