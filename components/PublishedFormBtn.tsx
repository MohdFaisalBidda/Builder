import React from "react";
import { Button } from "./ui/button";
import { Upload } from "lucide-react";
import { LuSend } from "react-icons/lu";

function PublishedFormBtn() {
  return (
    <Button className="gap-2">
      <LuSend className="w-4 h-4" /> Publish
    </Button>
  );
}

export default PublishedFormBtn;
