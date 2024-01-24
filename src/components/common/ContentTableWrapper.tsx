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
    <div className="overflow-hidden bg-white h-full p-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            {title}
          </h1>
          <p className="mt-2 text-sm text-gray-700">{description}</p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
