import { RocketLaunchIcon } from "@heroicons/react/24/outline";

export const PlaceEmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-12 border-2 border-dashed border-gray-300 rounded-lg">
      <RocketLaunchIcon className="w-10 h-10 mb-4 text-gray-800" />
      <p className="text-sm font-semibold text-gray-900">
        No places created yet
      </p>
      <p className="text-sm text-gray-600">
        Create your first place to get started
      </p>
    </div>
  );
};
