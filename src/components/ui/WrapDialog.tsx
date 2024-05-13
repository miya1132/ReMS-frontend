import {
  Dialog,
  DialogContent,
  // DialogDescription,
  DialogFooter,
  DialogHeader,
  // DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
// import * as DialogPrimitive from "@radix-ui/react-dialog";
// import { X } from "lucide-react";
import React from "react";
// import { FaGear } from "react-icons/fa6";

type Props = {
  children: React.ReactNode[];
};

const WrapDialog = ({ children }: Props) => {
  const trigger = children.find(
    (item) =>
      item &&
      React.isValidElement(item) &&
      (item as React.ReactElement<{ key: string }>).key === "trigger",
  );
  const header = children.find(
    (item) =>
      item &&
      React.isValidElement(item) &&
      (item as React.ReactElement<{ key: string }>).key === "header",
  );
  // const title = children.find(
  //   (item) =>
  //     item &&
  //     React.isValidElement(item) &&
  //     (item as React.ReactElement<{ key: string }>).key === "title",
  // );
  // const description = children.find(
  //   (item) =>
  //     item &&
  //     React.isValidElement(item) &&
  //     (item as React.ReactElement<{ key: string }>).key === "description",
  // );
  const body = children.find(
    (item) =>
      item &&
      React.isValidElement(item) &&
      (item as React.ReactElement<{ key: string }>).key === "body",
  );
  const footer = children.find(
    (item) =>
      item &&
      React.isValidElement(item) &&
      (item as React.ReactElement<{ key: string }>).key === "footer",
  );

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="w-[1080px] ">
        {header && <DialogHeader>{header}</DialogHeader>}
        {body}
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};

export default WrapDialog;
