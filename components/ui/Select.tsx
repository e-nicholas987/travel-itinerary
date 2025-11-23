import type { ReactNode, SelectHTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";
import Label from "./Label";

type SelectOption = {
  label: string;
  value: string | number;
  disabled?: boolean;
};

interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "className"> {
  id: string;
  label?: string;
  error?: string;
  containerClassName?: string;
  selectClassName?: string;
  icon?: ReactNode;
  options?: SelectOption[];
  isRequired?: boolean;
}

export default function SelectField({
  id,
  label,
  error,
  containerClassName,
  selectClassName,
  icon,
  options,
  children,
  isRequired,
  ...props
}: SelectProps) {
  return (
    <div className={cn("relative w-full", containerClassName)}>
      <Label
        id={id}
        label={label}
        isRequired={isRequired}
        className={!label ? "sr-only" : undefined}
      />

      <select
        id={id}
        {...props}
        className={cn(
          "h-12 w-full rounded-sm border border-primary-1100 p-4 py-2 text-black outline-none transition-shadow focus:border focus:bg-white focus:ring-2 focus:ring-primary-600/30 focus:border-primary-600 placeholder:text-sm placeholder:text-black-secondary appearance-none focus:shadow-primary-600",
          selectClassName
        )}
      >
        {options
          ? options.map((option) => (
              <option
                key={String(option.value)}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))
          : children}
      </select>

      {icon && icon}

      {error && (
        <p className="absolute bottom-0.5 right-0 text-xs text-error-900">
          {error}
        </p>
      )}
    </div>
  );
}
