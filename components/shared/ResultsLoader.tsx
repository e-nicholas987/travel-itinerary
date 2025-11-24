type ResultsLoaderProps = {
  message?: string;
};

export default function ResultsLoader({
  message = "Loading results...",
}: ResultsLoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-sm border border-neutral-200 bg-white px-6 py-8 text-center">
      <div className="flex items-center justify-center">
        <span className="inline-flex h-8 w-8 animate-spin rounded-full border-2 border-primary-600 border-t-transparent" />
      </div>
      <p className="text-xs font-medium text-black-secondary">{message}</p>
    </div>
  );
}


