import React, { Fragment, PropsWithChildren, useState, useEffect, } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
  PencilSquareIcon,
  ArrowRightOnRectangleIcon,
  ChatBubbleLeftIcon,
  CircleStackIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import LogoutModal from "../../pages/auth/LogoutModal";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/fm_h2.png";
import { useMapStyle } from "../../contexts/MapStyleContext"

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface SideBarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SideBar({ sidebarOpen, setSidebarOpen }: SideBarProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState("");
  const { logout, user } = useAuthContext();
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { toggleStyle } = useMapStyle();

  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleThemeChange = () => {
    setIsDarkMode(!isDarkMode); // Cambia el tema local (claro/oscuro)
    toggleStyle(); // Cambia el estilo del mapa globalmente
  };

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  const navigation = [
    {
      name: "Profile",
      href: "/profile",
      icon: UsersIcon,
      current: location.pathname === "/profile",
      openModal: false,
      private: true,
    },
    {
      name: "Colab",
      href: "/collaboration",
      icon: CircleStackIcon,
      current: location.pathname === "/collaboration",
      openModal: false,
      private: true,
    },
    {
      name: "Logout",
      href: "#",
      icon: ArrowRightOnRectangleIcon,
      current: false,
      openModal: true,
      action: handleLogout,
      private: true,
    },
    {
      name: "Login",
      href: "/login",
      icon: UsersIcon,
      current: false,
      openModal: false,
      private: false,
    },
  ];

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-white/80 dark:bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-2 ring-1 ring-white/10 bg-white dark:bg-gray-900">
                    <div className="flex h-16 shrink-0 items-center">
                      <img src={logo} alt="f" className="h-10 mt-8" />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="-mx-2 flex-1 space-y-1">
                        <li>
                          <a
                            href="/home"
                            className={classNames(
                              location.pathname === "/home"
                                ? "bg-gray-400 text-white dark:bg-gray-800 dark:text-white"
                                : "text-gray-400 hover:text-white hover:bg-gray-300 dark:hover:text-white dark:hover:bg-gray-800",
                              "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                            )}
                            onClick={(e) => { }}
                          >
                            <HomeIcon
                              className="h-6 w-6 shrink-0"
                              aria-hidden="true"
                            />
                            Home
                          </a>
                        </li>

                        {navigation.map((item) => (
                          <SidebarRenderProtectedItems
                            key={item.name}
                            privateRoute={item.private}
                          >
                            <li>
                              <a
                                href={item.href}
                                className={classNames(
                                  item.current
                                    ? "bg-gray-400 text-white dark:bg-gray-800 dark:text-white"
                                    : "text-gray-400 hover:text-white hover:bg-gray-300 dark:hover:text-white dark:hover:bg-gray-800",
                                  "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                )}
                                {...(item.action && { onClick: item.action })}
                              >
                                <item.icon
                                  className="h-6 w-6 shrink-0"
                                  aria-hidden="true"
                                />
                                {item.name}
                              </a>
                            </li>
                          </SidebarRenderProtectedItems>
                        ))}
                      </ul>
                    </nav>
                    {/* Aqui va el boton para la version Mobile */}
                    <div className="mt-auto ">
                      <button type="button" className="group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-400 hover:text-white hover:bg-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
                        onClick={handleThemeChange}
                      >
                        {isDarkMode ? (
                          <SunIcon className="h-6 w-6 mx-auto" />
                        ) : (
                          <MoonIcon className="h-6 w-6 mx-auto" />
                        )}
                        Change Theme
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <div className="h-full lg:flex lg:flex-col hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-20 lg:overflow-y-auto shadow-md shadow-slate-900 lg:pb-4 lg:bg-white dark:lg:bg-gray-900">
          <div className="flex h-16 shrink-0 items-center justify-center">
            <img src={logo} alt="f" className="h-10 mt-8" />
          </div>
          <nav className="flex-1 mt-8">
            <ul role="list" className="flex flex-col items-center space-y-1">
              <li>
                <a
                  href="/home"
                  className={classNames(
                    location.pathname === "/home"
                      ? "bg-gray-400 text-white dark:bg-gray-800 dark:text-white"
                      : "text-gray-400 hover:text-white hover:bg-gray-300 dark:hover:text-white dark:hover:bg-gray-800",
                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                  )}
                >
                  <HomeIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
                </a>
              </li>
              {navigation.map((item) => (
                <SidebarRenderProtectedItems
                  key={item.name}
                  privateRoute={item.private}
                >
                  <li>
                    <a
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-400 text-white dark:bg-gray-800 dark:text-white"
                          : "text-gray-400 hover:text-white hover:bg-gray-300 dark:hover:text-white dark:hover:bg-gray-800",
                        "group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold"
                      )}
                      onClick={(e) => {
                        if (item.openModal) {
                          e.preventDefault();
                          setModalOpen(true);
                        }
                      }}
                    >
                      <item.icon
                        className="h-6 w-6 shrink-0"
                        aria-hidden="true"
                      />
                      <span className="sr-only">{item.name}</span>
                    </a>
                  </li>
                </SidebarRenderProtectedItems>
              ))}
            </ul>
          </nav>
          {/* Boton cambio de tema */}
          <div className="mt-auto px-4 py-2">
            <button type="button" className="w-full py-2 text-center rounded-md text-gray-400 hover:text-white hover:bg-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
              onClick={handleThemeChange}
            >
              {isDarkMode ? (
                <SunIcon className="h-6 w-6 mx-auto" />
              ) : (
                <MoonIcon className="h-6 w-6 mx-auto" />
              )}
            </button>
          </div>
        </div>
        <LogoutModal modalOpen={modalOpen} setModalOpen={setModalOpen} />

        <div className="sticky top-0 z-40 flex items-center gap-x-6 px-4 py-4 shadow-sm sm:px-6 lg:hidden bg-white dark:bg-gray-900">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-400 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
    </>
  );
}

export const SidebarRenderProtectedItems: React.FC<
  PropsWithChildren<{ privateRoute: boolean }>
> = ({ children, privateRoute }) => {
  const { user } = useAuthContext();

  if (privateRoute && user) return children;
  if (!privateRoute && !user) return children;

  return null;
};
