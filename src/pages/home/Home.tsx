import { PlusCircleIcon } from "@heroicons/react/24/outline";

const items = [
  {
    name: "Fictions",
    initials: "F",
    href: "#",
    desc: "16 Fictions",
    bgColor: "bg-fikRed",
    icon: PlusCircleIcon,
  },
  {
    name: "Cities",
    initials: "C",
    href: "#",
    desc: "12 scenes",
    bgColor: "bg-fikYellow",
    icon: PlusCircleIcon,
  },
];

const actions = [
  {
    name: "Add a Scene",
    initials: "S",
    href: "#",
    desc: "Movie, TVShow or Book",
    bgColor: "bg-fikBlue",
    icon: PlusCircleIcon,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  return (
    <div className="pl-32 pt-6 lg:w-[1200px] w-[90%]">
      <h1 className="text-black text-3xl font-bold mb-3">
        Welcome, Francisco!
      </h1>
      <h2 className="text-base text-gray-900 mb-5">
        Start simple exploring Cities and Fiction.
      </h2>
      <ul
        role="list"
        className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
      >
        {items.map((item) => (
          <li key={item.name} className="col-span-1 flex rounded-md shadow-sm">
            <div
              className={classNames(
                item.bgColor,
                "flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white"
              )}
            >
              {item.initials}
            </div>
            <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
              <div className="flex-1 truncate px-4 py-2 text-sm">
                <a
                  href={item.href}
                  className="font-medium text-gray-900 hover:text-gray-600"
                >
                  {item.name}
                </a>
                <p className="text-gray-500">{item.desc}</p>
              </div>
              <div className="flex-shrink-0 pr-2">
                <button
                  type="button"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="sr-only">Open options</span>

                  <PlusCircleIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <h1 className="text-black text-2xl font-semibold mt-14 mb-3">
        Join the Community
      </h1>
      <h2 className="text-base text-gray-900 mb-5">
        You can also collaborate with the community, adding scenes in the ciries
        you visit.
      </h2>
      <ul
        role="list"
        className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
      >
        {actions.map((item) => (
          <li key={item.name} className="col-span-2 flex rounded-md shadow-sm">
            <div
              className={classNames(
                item.bgColor,
                "flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white"
              )}
            >
              {item.initials}
            </div>
            <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
              <div className="flex-1 truncate px-4 py-2 text-sm">
                <a
                  href={item.href}
                  className="font-medium text-gray-900 hover:text-gray-600"
                >
                  {item.name}
                </a>
                <p className="text-gray-500">{item.desc}</p>
              </div>
              <div className="flex-shrink-0 pr-2">
                <button
                  type="button"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="sr-only">Open options</span>

                  <PlusCircleIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
