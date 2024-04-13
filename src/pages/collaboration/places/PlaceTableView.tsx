import EntityTabs, { Tab } from "../../../components/common/EntityTabs";
import { Route, Routes } from "react-router-dom";
import PlaceTablePublished from "./PlaceTableSections/PlaceTablePublic";
import { PlaceTableUser } from "./PlaceTableSections/PlaceTableUser";
import { PlaceTableReview } from "./PlaceTableSections/PlaceTableReview";
import {
  ClipboardDocumentCheckIcon,
  UserCircleIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/solid";

export const PlaceTableView = () => {
  const tabsData: Tab[] = [
    {
      label: "My places",
      onClick: () => {},
      key: "mine",
      icon: <UserCircleIcon className="text-sm mr-1 h-4" />,
    },
    {
      label: "All places",
      key: "all",
      onClick: () => {},
      icon: <BuildingOffice2Icon className="text-sm mr-1 h-4" />,
    },
    {
      label: "In review",
      onClick: () => {},
      key: "review",
      icon: <ClipboardDocumentCheckIcon className="text-sm mr-1 h-4" />,
    },
  ];

  return (
    <>
      <div className="ml-10">
        <EntityTabs tabs={tabsData} />
      </div>
      <Routes>
        <Route index element={<PlaceTableUser />} />
        <Route path="all" element={<PlaceTablePublished />} />
        <Route path="mine" element={<PlaceTableUser />} />
        <Route path="review" element={<PlaceTableReview />} />
      </Routes>
    </>
  );
};
