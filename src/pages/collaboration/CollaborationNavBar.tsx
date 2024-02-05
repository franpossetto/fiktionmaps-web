import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const navigation = [
  { name: "Places", href: "places", current: true },
  // { name: "Fictions", href: "fictions", current: false },
  // { name: "Scenes", href: "scenes", current: false },
  // { name: "Cities", href: "cities", current: false },
];

const basePath = "/collaboration";

export const CollaborationNavBar = () => {
  const [currentTab, setCurrentTab] = useState(navigation[0].name);
  const handleNavigation = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    viewName: React.SetStateAction<string>
  ) => {
    console.log(viewName);
    setCurrentTab(viewName);
  };

  useEffect(() => {
    setCurrentTab("Places");
  }, []);

  return (
    <nav className="flex overflow-x-auto py-4 border-b-[1px] border-gray-200">
      <ul
        role="list"
        className="flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-gray-400 sm:px-6 lg:px-8"
      >
        {navigation.map((item) => (
          <li key={item.name} className="px-2 ">
            <Link
              to={`${basePath}/${item.href}`}
              onClick={(e) => handleNavigation(e, item.name)}
              className={
                item.name === currentTab
                  ? "text-indigo-600 font-bold"
                  : "text-gray-800"
              }
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
