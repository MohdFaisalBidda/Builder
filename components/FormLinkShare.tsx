"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import { Input } from "./ui/input";
import { CopyCheck } from "lucide-react";

function FormLinkShare({ shareUrl }: { shareUrl: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const shareLink = `${window.location.origin}/submit/${shareUrl}`;
  return (
    <div className="flex flex-grow gap-4 items-center mx-10 my-4">
      <Input className="" value={shareLink} readOnly />
      <Button
      className="w-[250px]"
        onClick={() => {
          navigator.clipboard.writeText(shareLink);
          toast({
            title: "Copied",
            description: "URL copied to the clipboard",
          });
        }}
      >
        <CopyCheck className="mr-2 h-4 w-4"/>
        Share URL
      </Button>
    </div>
  );
}

export default FormLinkShare;
