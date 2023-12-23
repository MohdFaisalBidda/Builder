import React, { useTransition } from "react";
import { Button } from "./ui/button";
import { Loader2, Upload } from "lucide-react";
import { LuSend } from "react-icons/lu";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
} from "@/components/ui/drawer";
import { toast } from "./ui/use-toast";
import { PublishedForm } from "@/actions/form";
import { useRouter } from "next/navigation";

function PublishedFormBtn({ id }: { id: number }) {
  const [loading, startTransition] = useTransition();
  const router = useRouter();

  const publishedForm = async () => {
    try {
      await PublishedForm(id);
      toast({
        title: "Success",
        description: "Form published successfully",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
      });
    }
  };
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="gap-2">
          <LuSend className="w-4 h-4" /> Publish
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <br />
          <DrawerTitle className="text-center">
            Are you sure absolutely sure?
          </DrawerTitle>
          <DrawerDescription className="text-center">
            This action cannot be undo. After publishing you will not be able to
            edit it. <br />
            <span className="font-medium">
              By publishing the form it will available to the users in public
              and you will be able to collect submissions.
            </span>
          </DrawerDescription>
        </DrawerHeader>
        <div className="w-fit mx-auto">
          <DrawerFooter className="">
            <Button
              onClick={(e) => {
                e.preventDefault();
                startTransition(publishedForm);
              }}
            >
              Publish {loading && <Loader2 className="animate-spin" />}
            </Button>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default PublishedFormBtn;
