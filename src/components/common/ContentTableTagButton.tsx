import React from "react";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
export enum TagColor {
  Emerald = "emerald",
  Amber = "amber",
  Cyan = "cyan",
  Red = "red",
  Gray = "gray",
  Grey = "grey",
}

interface ContentTableTagButtonProps {
  color: TagColor | string;
  onClick?: () => void;
  icon?: any;
  text: string;
}

export const ContentTableTagButton: React.FC<ContentTableTagButtonProps> = (
  props
) => {
  const getColorClass = (color: TagColor | string) => {
    switch (color) {
      case TagColor.Emerald:
        return "bg-emerald-100 hover:bg-emerald-300 text-gray-800 dark:bg-teal-900 dark:hover:bg-teal-700 dark:text-white";
      case TagColor.Amber:
        return "bg-amber-100 hover:bg-amber-300 text-gray-800 dark:bg-yellow-400/20 dark:hover:bg-yellow-200/40 dark:text-white";
      case TagColor.Cyan:
        return "bg-cyan-100 hover:bg-cyan-300 text-gray-800 dark:bg-sky-900 dark:hover:bg-sky-700 dark:text-white";
      case TagColor.Red:
        return "bg-red-100 hover:bg-red-300 text-gray-800 dark:bg-black dark:text-white dark:hover:bg-gray-700";
      case TagColor.Gray:
        return "bg-gray-100 hover:bg-gray-300 text-gray-800 dark:bg-gray-800 dark:hover:bg-gray-600 dark:text-white";
      case TagColor.Grey:
        return "bg-slate-100 text-gray-800 dark:bg-gray-800 dark:text-white";
      default:
        return "";
    }
  };

  const colorClass = getColorClass(props.color);
  return (
    <button
      className={`rounded-lg px-3 mr-2 py-[3px]  ${colorClass}`}
      onClick={props.onClick}
    >
      <span className="md:hidden">{props.icon}</span>
      <span className="hidden md:inline">{props.text}</span>
    </button>
  );
};
