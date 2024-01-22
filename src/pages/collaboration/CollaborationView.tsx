import { Fragment, useState } from "react";
import { Dialog, Switch, Transition } from "@headlessui/react";
import PlaceTableCollab from "../../components/places/placeTable/PlaceTableCollab";
import { CollaborationNavBar } from "./CollaborationNavBar";
import { BrowserRouter, Outlet, Route, Router, Routes } from "react-router-dom";

export default function CollaborationView() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="lg:pl-20 bg-white">
        <CollaborationNavBar />
        <Routes>
          <Route index element={<PlaceTableCollab />} />
          <Route path="places" element={<PlaceTableCollab />} />
          <Route path="fictions" element={<h1>Fictions</h1>} />
          <Route path="scenes" element={<h1>Scenes</h1>} />
          <Route path="cities" element={<h1>Cities</h1>} />
        </Routes>
      </div>
    </>
  );
}
