interface PlaceholderStateProps {
  hasStartWeek: boolean;
  hasEndWeek: boolean;
  hasProfile: boolean;
}

export default function ComparisionPlaceholder({
  hasStartWeek,
  hasEndWeek,
  hasProfile,
}: PlaceholderStateProps) {
  const getMissingSelections = () => {
    const missing = [];
    if (!hasStartWeek) missing.push("start week");
    if (!hasEndWeek) missing.push("end week");
    if (!hasProfile) missing.push("profile type");

    if (missing.length == 0) return "";
    if (missing.length == 1) return `Select a ${missing[0]}`;
    if (missing.length === 2) return `Select a ${missing[0]} and ${missing[1]}`;
    return "Select a Start Week, End Week, and Profile Type";
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
      <div className="text-gray-500 text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewbox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium">No Comparision Selected</h3>
        <p className="mt-1 text-sm text-gray-500">{getMissingSelections()}</p>
      </div>
    </div>
  );
}
