import { cn } from "@/lib/utils/cn";

import Label from "./Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./Select";
import { useEffect, useMemo, useRef, useState } from "react";
import { SelectOption } from "@/types/common";

interface SelectFieldProps
  extends Omit<React.ComponentProps<typeof Select>, "children"> {
  id: string;
  label?: string;
  error?: string;
  containerClassName?: string;
  isRequired?: boolean;
  options: SelectOption[];
  placeholder?: string;
  enableSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  isLoading?: boolean;
  emptyStateText?: string;
  onChange?: (value: string) => void;
  name?: string;
}

export default function SelectField({
  id,
  label,
  error,
  containerClassName,
  isRequired,
  options,
  placeholder,
  enableSearch,
  searchValue,
  onSearchChange,
  isLoading,
  emptyStateText = "No options",
  value,
  defaultValue,
  onChange,
  ...selectProps
}: SelectFieldProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen || !inputRef.current) {
      return;
    }
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, [isOpen, inputRef]);

  useEffect(() => {
    return () => {
      onSearchChange?.("");
    };
  }, [onSearchChange]);

  const filteredOptions = useMemo<SelectOption[]>(() => {
    if (!enableSearch) return options;
    if (!searchValue?.trim()) return options;
    const q = searchValue.toLowerCase();
    return options.filter(
      (option) =>
        option.label.toLowerCase().includes(q) ||
        option.value.toString().toLowerCase().includes(q)
    );
  }, [enableSearch, options, searchValue]);

  const handleValueChange = (nextValue: string) => {
    onChange?.(nextValue);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <div className={cn("w-full h-full", containerClassName)}>
      <Label
        id={id}
        label={label}
        isRequired={isRequired}
        className={!label ? "sr-only" : undefined}
      />

      <div className="relative w-full h-full">
        <Select
          value={value ?? ""}
          defaultValue={defaultValue}
          onValueChange={handleValueChange}
          onOpenChange={handleOpenChange}
          {...selectProps}
        >
          <SelectTrigger
            id={id}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
          >
            <SelectValue
              className="text-left whitespace-nowrap truncate"
              placeholder={isLoading ? "Loading" : placeholder}
            />
          </SelectTrigger>

          <SelectContent hideTopScrollbar={enableSearch} className="pt-0">
            {enableSearch && (
              <div className="border-b z-10 sticky top-0 bg-white border-neutral-200 px-2 pb-2 pt-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={searchValue}
                  onChange={(event) => {
                    onSearchChange?.(event.target.value);
                  }}
                  placeholder="Search..."
                  className="h-8 w-full rounded-sm border border-primary-1100 px-2 text-xs text-black outline-none transition-shadow focus:border-primary-600 focus:bg-white focus:ring-2 focus:ring-primary-600/30"
                />
              </div>
            )}

            {isLoading ? (
              <div className="px-4 py-3 text-sm text-black-secondary">
                Loading...
              </div>
            ) : filteredOptions.length === 0 && emptyStateText ? (
              <div className="px-4 py-3 text-black-secondary text-center text-sm">
                {emptyStateText}
              </div>
            ) : (
              filteredOptions.map((option) => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>
      {error && <p className="text-red-700 text-xs mt-1">{error}</p>}
    </div>
  );
}
