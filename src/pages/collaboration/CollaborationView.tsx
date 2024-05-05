import { CollaborationNavBar } from "./CollaborationNavBar";
import { Route, Routes } from "react-router-dom";
import { FictionTableCollab } from "./fictions/FictionTableCollab";
import { SceneTableCollab } from "./scenes/SceneTableCall";
import { CityTableCollab } from "./cities/CityTableCollab";
import { PlaceTableView } from "./places/PlaceTableView";

export default function CollaborationView() {
  return (
    <>
      <div className="lg:pl-20 bg-white dark:bg-gray-900">
        <CollaborationNavBar />
        <Routes>
          <Route index path="/" element={<PlaceTableView />} />
          <Route index path="/places/*" element={<PlaceTableView />} />
          <Route path="/places/*" element={<PlaceTableView />} />
          <Route path="fictions" element={<FictionTableCollab />} />
          <Route path="scenes" element={<SceneTableCollab />} />
          <Route path="cities" element={<CityTableCollab />} />
        </Routes>
      </div>
    </>
  );
}
