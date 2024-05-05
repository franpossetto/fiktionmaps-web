import React from "react";
import { Link, useLocation } from "react-router-dom";

export interface Tab {
  label: string;
  key: string;
  onClick: any;
  icon: any;
}

interface EntityTabsProps {
  tabs: Tab[];
}

const EntityTabs: React.FC<EntityTabsProps> = ({ tabs }) => {
  const location = useLocation();
  const basePath = "/collaboration/places";

  const isSelectedTab = (tabKey: string) => {
    const currentPath =
      location.pathname === "/collaboration"
        ? "/collaboration/mine"
        : location.pathname;
    const isSelected = tabKey === currentPath.split("/").pop();
    const className = `
      rounded-lg text-xs mt-5 px-2 py-2 items-center justify-start
      ${
        isSelected
          ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-black"
          : "bg-gray-100 text-black dark:bg-gray-800 dark:text-white"
      }
    `;
    return className;
  };

  return (
    <div className="flex flex-row">
      {tabs.map((tab, index) => (
        <button key={index} type="button" className={isSelectedTab(tab.key)}>
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
