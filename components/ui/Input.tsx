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
    <div className={cn("relative w-full", containerClassName)}>
      <Label
        id={id}
        label={label}
        isRequired={isRequired}
        className={!label ? "sr-only" : undefined}
      />
      <input
        id={id}
        {...props}
        className={cn(
          "placeholder:text-black-secondary focus:ring-primary-600/30 focus:border-primary-600 focus:shadow-primary-600 h-12 w-full rounded-sm border border-primary-1100 py-2 p-4 text-black outline-none transition-shadow placeholder:text-sm focus:border focus:bg-white focus:ring-2",
          inputClassName
        )}
      />
      {icon && icon}
      {error && (
        <p className="text-error-900 text-xs absolute bottom-0.5 right-0">
          {error}
        </p>
      )}
    </div>
  );
}
