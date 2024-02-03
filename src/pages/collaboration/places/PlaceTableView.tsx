import { useEffect, useState } from "react";
import { useFictionService } from "../../../services/useFictionService";
import { UserService } from "../../../services/UserService";
import { User } from "firebase/auth";
import EntityTabs, { Tab } from "../../../components/common/EntityTabs";
import { ContentTableWrapper } from "../../../components/common/ContentTableWrapper";
import { Route, Routes } from "react-router-dom";
import PlaceTablePublic from "./PlaceTablePublic";
import PlaceTableCollab from "./PlaceTableCollab";
import { PlaceTableUser } from "./PlaceTableUser";

export const PlaceTableView = () => {
  const [loggedUser, setLoggedUser] = useState<User>();

  const { getFictions, getPlaces, getPlacesByUser } = useFictionService();
  const places = getPlacesByUser();
  const fictions = getFictions();

  const getUserInfo = async () => {
    const userService = new UserService();
    const response = await userService.getCurrentUser();
    setLoggedUser(response);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const tabsData: Tab[] = [
    {
      label: "All places",
      key: "all",
      onClick: () => {},
    },
    {
      label: "My places",
      onClick: () => {},
      key: "mine",
    },
    {
      label: "Places in review",
      onClick: () => {},
      key: "review",
    },
  ];

  return (
    <>
      <div className="ml-10">
        <EntityTabs tabs={tabsData} />
      </div>
      <Routes>
        <Route index element={<PlaceTablePublic />} />
        <Route path="all" element={<PlaceTablePublic />} />
        <Route path="mine" element={<PlaceTableUser />} />
        <Route path="review" element={<PlaceTableCollab />} />
      </Routes>
    </>
  );
};
