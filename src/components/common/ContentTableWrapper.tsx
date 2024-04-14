import { PlusCircleIcon } from "@heroicons/react/24/solid";

interface ContentTableTitleProps {
  title: string;
  description: string;
  action?: {
    title: string;
    fn: any;
  };
  children: React.ReactNode;
}

export const ContentTableWrapper: React.FC<ContentTableTitleProps> = ({
  title,
  description,
  action,
  children,
}) => {
  return (
    <div className="overflow-hidden bg-white min-h-screen h-full sm:pl-0 sm:pr-0 pl-4 pr-4 dark:bg-gray-900">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <p className="text-sm text-gray-700 mt-2 sm:ml-8 dark:text-white">
            {description}
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 flex flex-row">
          <button
            type="button"
            className="flex rounded-md bg-indigo-600 px-3 py-2 text-center text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:mr-8 mt-1 items-center justify-start"
            onClick={() => {
              action?.fn(true);
            }}
          >
            <PlusCircleIcon className="text-sm mr-2 h-4" />
            {action?.title}
          </button>
        </div>
      </div>
      {children}
    </div>
  );
};
