import { XIcon } from "lucide-react";

type RemoveItineraryButtonProps = {
  onClick: () => void;
};

export default function RemoveItineraryButton({
  onClick,
}: RemoveItineraryButtonProps) {
  return (
    <button
      type="button"
      className="w-full h-11.5  sm:w-11.5 transition-colors duration-300 cursor-pointer hover:bg-red-700 hover:text-white sm:not-only:h-full grid place-items-center bg-error-100 text-red-700"
      onClick={onClick}
    >
      <span className="sm:hidden text-sm font-medium">Delete</span>
      <XIcon className="hidden sm:block size-4" />
    </button>
  );
}
