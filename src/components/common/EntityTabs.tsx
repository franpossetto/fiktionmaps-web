import React from "react";
import { Link, useLocation } from "react-router-dom";

export interface Tab {
  label: string;
  key: string;
  icon: any;
}

interface EntityTabsProps {
  tabs: Tab[];
}

const EntityTabs: React.FC<EntityTabsProps> = ({ tabs }) => {
  const location = useLocation();
  const basePath = "/collaboration/places";

  return (
    <div className="flex flex-row">
      {tabs.map((tab, index) => (
        <button
          key={index}
          type="button"
          className={`
          rounded-lg text-xs mt-5 px-2 py-2 items-center justify-start
          ${
            tab.key === location.pathname.split("/").pop()
              ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-black"
              : "bg-gray-100 text-black dark:bg-gray-800 dark:text-white"
          }
          ${index < tabs.length - 1 ? "mr-3" : ""}
        `}
        >
          <span className="flex items-center">
            {tab.icon}
            <Link to={`${basePath}/${tab.key}`}>{tab.label}</Link>
          </span>
        </button>
      ))}
    </div>
  );
};

export default EntityTabs;
