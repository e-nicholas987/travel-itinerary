import { cn } from "@/lib/utils/cn";

type EmptyResultsStateProps = {
  title: string;
  description: string;
  className?: string;
};

export default function EmptyResultsState({
  title,
  description,
  className,
}: EmptyResultsStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-sm border border-dashed border-neutral-300 bg-neutral-100 px-6 py-10 text-center",
        className
      )}
    >
      <p className="text-sm font-semibold text-black-primary">{title}</p>
      <p className="mt-1 text-xs font-medium text-black-secondary">
        {description}
      </p>
    </div>
  );
}


