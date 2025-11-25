import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";
import { Loader2Icon } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "tertiary" | "white";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function buttonVariants({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) {
  const base =
    "inline-flex cursor-pointer items-center relative justify-center gap-2 rounded-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 duration-300";

  const variants = {
    primary: "bg-primary-600 text-white hover:bg-primary-600/90 shadow-sm",
    secondary:
      "bg-white text-primary-600 ring-1 ring-primary-600 hover:bg-primary-100",
    tertiary:
      "bg-neutral-300 text-color-text-black-primary hover:bg-neutral-500",
    white: "bg-white text-primary-600 hover:bg-primary-100",
  };

  const sizes: Record<ButtonSize, string> = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-6 text-sm",
    lg: "h-11.5 px-5 text-sm",
  };

  return cn(base, variants[variant], sizes[size], className);
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  isLoading = false,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        buttonVariants({
          variant,
          size,
          className,
        }),
        isLoading && "pointer-events-none opacity-30"
      )}
      {...props}
    >
      {isLoading && (
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Loader2Icon className="size-4 animate-spin" />
        </span>
      )}

      {isLoading ? <span className="invisible">{children}</span> : children}
    </button>
  );
}
