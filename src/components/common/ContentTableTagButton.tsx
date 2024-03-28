import React from "react";

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
  text: string;
}

export const ContentTableTagButton: React.FC<ContentTableTagButtonProps> = ({
  color,
  onClick,
  text,
}) => {
  // Obtener la clase CSS correspondiente al color
  const getColorClass = (color: TagColor | string) => {
    switch (color) {
      case TagColor.Emerald:
        return "bg-emerald-100 hover:bg-emerald-300 text-gray-800";
      case TagColor.Amber:
        return "bg-amber-100 hover:bg-amber-300 text-gray-800";
      case TagColor.Cyan:
        return "bg-cyan-100 hover:bg-cyan-300 text-gray-800";
      case TagColor.Red:
        return "bg-red-100 hover:bg-red-300 text-gray-800";
      case TagColor.Gray:
        return "bg-gray-100 hover:bg-gray-300 text-gray-800 ";
      case TagColor.Grey:
        return "bg-slate-100 text-gray-800 ";
      default:
        return "";
    }
  };

  const colorClass = getColorClass(color);

  return (
    <button
      className={`rounded-lg px-3 mr-2 py-[3px]  ${colorClass}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
