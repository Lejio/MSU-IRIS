import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/input";

export default function NewProjectSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button color="primary" variant="bordered">
          New Project
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>New Project</SheetTitle>
          <SheetDescription>Create a new particle project</SheetDescription>
        </SheetHeader>
        <div className=" my-5">
          <Input type="name" label="Project Name" />
        </div>
        <SheetFooter>
          <Button type="submit" color="primary" variant="solid">
            Create Project
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
