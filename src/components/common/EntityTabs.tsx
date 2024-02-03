import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export interface Tab {
  label: string;
  onClick: () => void;
  key: string;
}

interface EntityTabsProps {
  tabs: Tab[];
}

const EntityTabs: React.FC<EntityTabsProps> = ({ tabs }) => {
  const [currentTab, setCurrentTab] = useState(tabs[0].key);

  const handleNavigation = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    viewName: React.SetStateAction<string>
  ) => {
    setCurrentTab(viewName);
  };

  useEffect(() => {
    console.log(currentTab);
  }, [currentTab]);

  const basePath = "/collaboration/places";

  return (
    <div>
      {tabs.map((tab, index) => (
        <button
          key={index}
          type="button"
          className={`rounded-lg text-xs mt-5 px-2 py-1 ${
            tab.key == currentTab
              ? "bg-gray-900 text-white"
              : "bg-gray-100 text-black"
          } ${index < tabs.length - 1 ? "mr-3" : ""}`}
        >
          <Link
            to={`${basePath}/${tab.key}`}
            onClick={(e) => handleNavigation(e, tab.key)}
          >
            {tab.label}
          </Link>
        </button>
      ))}
    </div>
  );
};

export default EntityTabs;
