import { cn } from "@/lib/utils/cn";
import { InputHTMLAttributes } from "react";
import Label from "./Label";

interface InputProps
  extends InputHTMLAttributes<Omit<HTMLInputElement, "className">> {
  id: string;
  label?: string;
  error?: string;
  containerClassName?: string;
  inputClassName?: string;
  isRequired?: boolean;
  icon?: React.ReactNode;
}

export default function InputField({
  label,
  id,
  containerClassName,
  inputClassName,
  error,
  icon,
  isRequired,
  ...props
}: InputProps) {
  return (
    <div className={cn("w-full h-full", containerClassName)}>
      <Label
        id={id}
        label={label}
        isRequired={isRequired}
        className={!label ? "sr-only" : undefined}
      />

      <div className="relative w-full h-fit">
        <input
          id={id}
          {...props}
          className={cn(
            "placeholder:text-black-secondary  bg-white focus:ring-primary-600/30 focus:border-primary-600 focus:shadow-primary-600 h-12 w-full rounded-sm border border-primary-1100 py-2 p-4 text-black outline-none transition-shadow placeholder:text-sm focus:border focus:bg-white focus:ring-2",
            {
              "[[type='date']]:text-sm [[type='date']]:text-black-secondary":
                !props.value,
            },
            inputClassName
          )}
        />
        {icon && icon}
      </div>
      {error && <p className="text-red-700 text-xs mt-1">{error}</p>}
    </div>
  );
}
