import { Fragment, ReactNode, useEffect, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Fiction } from '../../types/Fiction'
import { Place } from '../../types/Place'
import { PlaceUser } from './components/PlaceUser'
import { PlaceImage } from './components/PlaceImage'
import { PlaceOverview } from './components/PlaceOverview'
import { UserService } from '../../services/UserService'
import { User } from '../../types/User'
import { PlaceData } from './components/PlaceData'
import { PlaceScenes } from './components/PlaceScene/PlaceScenes'


interface PlaceViewProps {
  fiction: Fiction;
  place: Place;
}

const PlaceView: React.FC<PlaceViewProps> = ({ fiction, place }) => {


  return (
    <PlaceViewWrapper>
      <PlaceImage place = {place}></PlaceImage>
      <PlaceOverview fiction = {fiction} place = {place}/>
      <PlaceData fiction = {fiction} place = {place}  />
      <PlaceScenes scenes = {place.scenes}/>
    </PlaceViewWrapper>
  )
}

export default PlaceView;

interface PlaceViewWrapperProps {
  children: ReactNode;
}

const PlaceViewWrapper: React.FC<PlaceViewWrapperProps> = ({ children }) => {
  const [open, setOpen] = useState(true)

  const [loggedUser, setLoggedUser] = useState<User>();

  const getUserInfo = async () => {
    const userService = new UserService();
    const response = await userService.getCurrentUser();
    setLoggedUser(response);
  };

  useEffect(()=>{
    getUserInfo();
  },[])


  return(
    <>
     <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setOpen}>
        <div className="fixed inset-0"/>
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
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="pl-5 py-3">
                      <div className="flex items-start justify-between">
                      {loggedUser ? (
                          <PlaceUser user={loggedUser} />
                        ) : (
                          <div>Loading user...</div>
                        )}
                        <div className="flex h-7 items-center mr-6 mt-2">
                          <button
                          type="button"
                          className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 p-3"
                          onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="pb-1 sm:pb-6">
                          {children}
                      </div>
                  </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
    </>);
}

{/* <div className="px-4 pb-5 pt-5 sm:px-0 sm:pt-0">
<dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
  <div>
    <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">About {fiction.name}</dt>

    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
      <p>
        {fiction.overview}
      </p>
    </dd>
  </div>
  <div>
  <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">Address</dt>

  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
      <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.location.formattedAddress)}`} target="_blank" rel="noopener noreferrer">
        {place.location.formattedAddress}
      </a>
    </dd>
  </div>
  <div>
    <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">Duration</dt>
    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{fiction.duration} min</dd>
  </div>
  <div>
    <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">IMDB</dt>
    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
      <time dateTime="1988-06-23">{fiction.externalId}</time>
    </dd>
  </div>
</dl>
</div> */}