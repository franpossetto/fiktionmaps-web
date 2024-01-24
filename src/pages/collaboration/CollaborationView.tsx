import { Fragment, useState } from "react";
import { Dialog, Switch, Transition } from "@headlessui/react";
import PlaceTableCollab from "./places/PlaceTableCollab";
import { CollaborationNavBar } from "./CollaborationNavBar";
import { BrowserRouter, Outlet, Route, Router, Routes } from "react-router-dom";
import { FictionTableCollab } from "./fictions/FictionTableCollab";
import { SceneTableCollab } from "./scenes/SceneTableCall";
import { CityTableCollab } from "./cities/CityTableCollab";

export default function CollaborationView() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="lg:pl-20 bg-white">
        <CollaborationNavBar />
        <Routes>
          <Route index element={<PlaceTableCollab />} />
          <Route path="places" element={<PlaceTableCollab />} />
          <Route path="fictions" element={<FictionTableCollab />} />
          <Route path="scenes" element={<SceneTableCollab />} />
          <Route path="cities" element={<CityTableCollab />} />
        </Routes>
      </div>
    </>
  );
}
