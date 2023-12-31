"use client";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";

function Error({ error }: { error: Error }) {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <div className="flex w-full h-full flex-col items-center justify-center gap-4">
      <h1 className="text-destructive text-4xl">Something went Wrong!</h1>
      <Button asChild>
        <Link className="gap-x-2" href={"/"}>Go back to home <HomeIcon className="h-4 w-4"/></Link>
      </Button>
    </div>
  );
}

export default Error;
