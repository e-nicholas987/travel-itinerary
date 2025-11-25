import type { ReactNode } from "react";

type FormSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export default function FormSection({
  title,
  description,
  children,
}: FormSectionProps) {
  return (
    <section className="space-y-4 rounded-sm bg-white pb-5 sm:p-5">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <h3 className="text-sm font-semibold text-black-primary">{title}</h3>
        {description && (
          <p className="text-xs font-medium text-black-secondary">
            {description}
          </p>
        )}
      </div>

      {children}
    </section>
  );
}
