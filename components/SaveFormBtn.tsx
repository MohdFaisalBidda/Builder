import React from "react";
import { Button } from "./ui/button";
import { Save } from "lucide-react";

function SaveFormBtn() {
  return (
    <Button className="gap-2" variant={"outline"}>
      <Save className="h-4 w-4" />
      Save
    </Button>
  );
}

export default SaveFormBtn;
