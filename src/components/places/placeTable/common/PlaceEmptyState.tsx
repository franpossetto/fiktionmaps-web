interface PlaceEmptyStateProps {
  icon: React.ReactNode;
  title: string;
  message: string;
}

export const PlaceEmptyState: React.FC<PlaceEmptyStateProps> = ({
  icon,
  title,
  message,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-12 border-2 border-dashed border-gray-300 rounded-lg">
      {icon}
      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
        {title}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400">{message}</p>
    </div>
  );
};
