import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

export const SelectNoResults = () => {
  return (
    <div className="px-6 py-14 text-center text-sm sm:px-14">
      <ExclamationCircleIcon
        type="outline"
        name="exclamation-circle"
        className="mx-auto h-6 w-6 text-gray-400"
      />
      <p className="mt-4 font-semibold text-gray-900">No results found</p>
      <p className="mt-2 text-gray-500">
        No components found for this search term. Please try again.
      </p>
    </div>
  );
};
