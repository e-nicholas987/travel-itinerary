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
      className="w-11.5 cursor-pointer hover:bg-error-900 hover:text-white h-full grid place-items-center bg-error-100 text-error-900"
      onClick={onClick}
    >
      <XIcon className="size-4" />
    </button>
  );
}
