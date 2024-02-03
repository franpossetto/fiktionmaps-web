import EntityTabs, { Tab } from "./EntityTabs";

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
    <div className="overflow-hidden bg-white min-h-screen h-full pl-10">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <p className="text-sm text-gray-700 mt-2">{description}</p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-8"
            onClick={() => {
              action?.fn(true);
            }}
          >
            {action?.title}
          </button>
        </div>
      </div>
      {children}
    </div>
  );
};
