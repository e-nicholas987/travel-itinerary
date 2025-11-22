import { twMerge } from 'tailwind-merge';

type ClassValue = string | number | boolean | null | undefined;

export function cn(...classes: ClassValue[]) {
  return twMerge(
    classes
      .flat(Infinity)
      .filter(Boolean)
      .join(' ')
  );
}


