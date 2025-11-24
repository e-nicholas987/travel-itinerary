type RemoveItineraryButtonProps = {
  onClick: () => void;
};

export default function RemoveItineraryButton({
  onClick,
}: RemoveItineraryButtonProps) {
  return (
    <button
      type="button"
      className="w-11.5 h-full grid place-items-center bg-error-100 text-error-900"
      onClick={onClick}
    >
      X
    </button>
  );
}
