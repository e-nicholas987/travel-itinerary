type ResultsHeaderProps = {
  title: string;
  count: number;
  label: string;
};

export default function ResultsHeader({
  title,
  count,
  label,
}: ResultsHeaderProps) {
  return (
    <header className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
      <div>
        <h2 className="text-base font-semibold leading-6 tracking-[-0.02em]">
          {title}
        </h2>
        <p className="text-xs font-medium text-black-secondary">
          Showing {count} {label}
        </p>
      </div>
    </header>
  );
}



