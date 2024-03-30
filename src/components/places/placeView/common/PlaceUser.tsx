interface PlaceUserProps {
  email: String | undefined;
}

export const PlaceUser: React.FC<PlaceUserProps> = ({ email }) => {
  return (
    <a className="block flex-1">
      <div className="relative flex min-w-0 flex-1 items-center">
        <span className="relative inline-block flex-shrink-0">
          <span className="absolute top-[-0.3rem] right-[-0.3rem] flex h-3 w-3 items-center justify-center rounded-full bg-emerald-400"></span>
        </span>
        <div className="ml-4 truncate">
          <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
            Created by
          </p>
          <p className="truncate text-sm text-gray-500 dark:text-gray-300">
            {email || "cannot load user"}
          </p>
        </div>
      </div>
    </a>
  );
};
