import * as React from "react";
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  type UseFormReturn,
} from "react-hook-form";

import { cn } from "@/lib/utils/cn";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormProps = UseFormReturn<any>;

export function Form({
  children,
  ...form
}: React.PropsWithChildren<FormProps>) {
  return <FormProvider {...form}>{children}</FormProvider>;
}

export type FormFieldProps<TFieldValues extends FieldValues> = {
  name: FieldPath<TFieldValues>;
} & Omit<ControllerProps<TFieldValues>, "render" | "name" | "control"> & {
    render: ControllerProps<TFieldValues>["render"];
  };

export function FormField<TFieldValues extends FieldValues>({
  name,
  ...props
}: FormFieldProps<TFieldValues>) {
  const { control } = useFormContext<TFieldValues>();

  return <Controller name={name} control={control} {...props} />;
}

export type FormItemProps = React.HTMLAttributes<HTMLDivElement>;

export function FormItem({ className, ...props }: FormItemProps) {
  return (
    <div className={cn("space-y-2 w-full", className)} {...props}>
      {props.children}
    </div>
  );
}

export type FormLabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  isRequired?: boolean;
};

export function FormLabel({ className, ...props }: FormLabelProps) {
  return (
    <label
      className={cn(
        "block text-xs font-medium text-black-secondary mb-1",
        {
          "after:ml-0.5 after:text-error-900 after:content-['*']":
            props.isRequired,
        },
        className
      )}
      {...props}
    />
  );
}

export type FormControlProps = React.HTMLAttributes<HTMLDivElement>;

export function FormControl({ className, ...props }: FormControlProps) {
  return (
    <div className={cn("w-full h-full", className)} {...props}>
      {props.children}
    </div>
  );
}

export type FormMessageProps = React.HTMLAttributes<HTMLParagraphElement>;

export function FormMessage({ className, ...props }: FormMessageProps) {
  if (!props.children) return null;

  return (
    <p className={cn("text-red-700 text-xs mt-1", className)} {...props} />
  );
}
