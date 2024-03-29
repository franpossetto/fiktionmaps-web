import { Fragment, ReactNode, useEffect, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fiction } from "../../../types/Fiction";
import { Place } from "../../../types/Place";
import { PlaceImage } from "./common/PlaceImage";
import { PlaceOverview } from "./common/PlaceOverview";
import { UserService } from "../../../services/UserService";
import { User } from "../../../types/User";
import { PlaceData } from "./common/PlaceData";
import { PlaceScenes } from "../placeTable/common/PlaceScene/PlaceScenes";
import { PlaceCloseCard } from "../placeTable/common/PlaceScene/PlaceCloseCard";

interface PlaceViewProps {
  fiction: Fiction;
  place: Place;
}

const PlaceView: React.FC<PlaceViewProps> = ({ fiction, place }) => {
  const [open, setOpen] = useState(true);

  return (
    <PlaceViewWrapper open={open} setOpen={setOpen}>
      <PlaceCloseCard place={place} setOpen={setOpen} />
      <PlaceImage place={place}></PlaceImage>
      <PlaceOverview fiction={fiction} place={place} />
      <PlaceData fiction={fiction} place={place} />
      <PlaceScenes scenes={place.scenes} />
    </PlaceViewWrapper>
  );
};

export default PlaceView;

interface PlaceViewWrapperProps {
  children: ReactNode;
  open: any;
  setOpen: any;
}

const PlaceViewWrapper: React.FC<PlaceViewWrapperProps> = ({
  open,
  setOpen,
  children,
}) => {
  const [loggedUser, setLoggedUser] = useState<User>();

  const getUserInfo = async () => {
    const userService = new UserService();
    const response = await userService.getCurrentUser();
    setLoggedUser(response);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setOpen}>
          <div className="fixed inset-0" />
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md md:min-w-[650px]">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl dark:bg-gray-900">
                      <div className="pb-1 sm:pb-6">{children}</div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};
