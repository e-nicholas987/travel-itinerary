import { cn } from "@/lib/utils/cn";
import type { LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  id: string;
  label?: string;
  isRequired?: boolean;
}

function Label({ id, label, isRequired, ...props }: LabelProps) {
  return (
    <label
      id={id}
      {...props}
      className={cn("block text-xs font-medium leading-8", {
        "after:ml-0.5 after:text-error-900 after:content-['*']": isRequired,
      })}
      htmlFor={id}
    >
      {label}
    </label>
  );
}

export default Label;
