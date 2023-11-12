import {
  BoltIcon,
  CodeBracketIcon,
  HeartIcon,
  ListBulletIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useFictionService } from "../../services/useFictionService";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { UserService } from "../../services/UserService";

const actions = [
  {
    name: "Add a Fiction",
    initials: "F",
    href: "/fictions/add",
    desc: "Movie, TVShow or Book",
    bgColor: "bg-fikRed",
    icon: PlusCircleIcon,
  },
  {
    name: "Add a Scene",
    initials: "S",
    href: "/scenes/add",
    desc: "Movie, TVShow or Book",
    bgColor: "bg-fikLightBlue",
    icon: PlusCircleIcon,
  },
];

const more = [
  {
    name: "About",
    initials: "A",
    href: "/",
    desc: "This project",
    bgColor: "bg-fikYellow",
    icon: HeartIcon,
  },
  {
    name: "Rest API",
    initials: "A",
    href: "/",
    desc: "Docs",
    bgColor: "bg-fikBlue",
    icon: CodeBracketIcon,
  },
  {
    name: "Ontology",
    initials: "O",
    href: "/",
    desc: "Coming soon",
    bgColor: "bg-fikRed",
    icon: BoltIcon,
  },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Admin() {
  const [loggedUser, setLoggedUser] = useState<any>();
  const navigate = useNavigate();
  const { getTotals } = useFictionService();
  const { user } = useAuthContext();

  const getUserInfo = async () => {
    const userService = new UserService();
    const response = await userService.getCurrentUser();
    setLoggedUser(response);
  };

  useEffect(()=>{
    getUserInfo();
  },[])

  const [items, setItems] = useState([
    {
      name: "Fictions",
      initials: "F",
      href: "/fictions/table",
      desc: "",
      bgColor: "bg-fikRed",
      icon: ListBulletIcon,
    },
    {
      name: "Cities",
      initials: "C",
      href: "/cities/table",
      desc: "",
      bgColor: "bg-fikYellow",
      icon: ListBulletIcon,
    },
    {
      name: "Scenes",
      initials: "S",
      href: "/scenes/table",
      desc: "",
      bgColor: "bg-fikBlue",
      icon: ListBulletIcon,
    },
    {
      name: "Locations",
      initials: "L",
      href: "/locations/table",
      desc: "",
      bgColor: "bg-fikLightBlue",
      icon: ListBulletIcon,
    },
  ]);

  const fetchData = () => {
    if (data) {
      console.log(data);
      setItems((prevItems) => [
        {
          ...prevItems[0],
          desc: `${data.fictions} Fictions`,
        },
        {
          ...prevItems[1],
          desc: `${data.cities} Cities`,
        },
        {
          ...prevItems[2],
          desc: `${data.scenes} Scenes`,
        },
        {
          ...prevItems[3],
          desc: `${data.locations} Locations`,
        },
      ]);
    }
  };

  const { loading, data, error } = getTotals();
  useEffect(() => {
    fetchData();
  }, [data]);

  return (
    <div className="pl-32 pt-6 lg:w-[1200px] w-[90%]">
      <div className="overflow-hidden bg-white shadow sm:rounded-lg p-10">
        <h1 className="text-black text-3xl font-bold mb-3">
          Welcome { loggedUser?.name}!
        </h1>
        <h2 className="text-base text-gray-900">
          In this section you can find information about what you can do in
          Fiktion Maps.
        </h2>
        <h1 className="text-black text-2xl font-semibold mt-10 mb-2">
          Explore
        </h1>
        <h2 className="text-base text-gray-900 mb-5">
          Start simple: Explore Cities and find Fictions!
        </h2>
        <ul role="list" className="mt-3 grid grid-cols-1 gap-5 ">
          {items.map((item) => (
            <li key={item.name} className="flex w-1/3 rounded-md shadow-sm">
              <div
                className={classNames(
                  item.bgColor,
                  "flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white"
                )}
              >
                {item.initials}
              </div>
              <div
                className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white cursor-pointer"
                onClick={() => {
                  navigate(item.href);
                  console.log(item.href);
                }}
              >
                <div className="flex-1 truncate px-4 py-2 text-sm">
                  <a
                    href={item.href}
                    className="font-medium text-gray-900 hover:text-gray-600"
                  >
                    {item.name}
                  </a>
                  <p className="text-gray-500">{item.desc}</p>
                </div>
                <div className="flex-shrink-0 pr-2">
                  <button
                    type="button"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="sr-only">Open options</span>

                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <h1 className="text-black text-2xl font-semibold mt-14 mb-2">
          Collaborate
        </h1>
        <h2 className="text-base text-gray-900 mb-5">
          You can also collaborate with the community, adding scenes in the
          ciries you visit.
        </h2>

        <ul role="list" className="mt-3 grid grid-cols-1 gap-5 ">
          {actions.map((item) => (
            <li key={item.name} className="flex w-1/3 rounded-md shadow-sm">
              <div
                className={classNames(
                  item.bgColor,
                  "flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white"
                )}
              >
                {item.initials}
              </div>
              <div
                className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white cursor-pointer"
                onClick={() => {
                  navigate(item.href);
                  console.log(item.href);
                }}
              >
                <div className="flex-1 truncate px-4 py-2 text-sm">
                  <a
                    href={item.href}
                    className="font-medium text-gray-900 hover:text-gray-600"
                  >
                    {item.name}
                  </a>
                  <p className="text-gray-500">{item.desc}</p>
                </div>
                <div className="flex-shrink-0 pr-2">
                  <button
                    type="button"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="sr-only">Open options</span>

                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <h1 className="text-black text-2xl font-semibold mt-14 mb-2">
          Learn more
        </h1>
        <h2 className="text-base text-gray-900 mb-5">
          Learn how the data is structurated behind scenes
        </h2>
        <ul role="list" className="mt-3 grid grid-cols-1 gap-5 ">
          {more.map((item) => (
            <li key={item.name} className="flex w-1/3 rounded-md shadow-sm">
              <div
                className={classNames(
                  item.bgColor,
                  "flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white"
                )}
              >
                {item.initials}
              </div>
              <div
                className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white cursor-pointer"
                onClick={() => {
                  navigate(item.href);
                  console.log(item.href);
                }}
              >
                <div className="flex-1 truncate px-4 py-2 text-sm">
                  <a
                    href={item.href}
                    className="font-medium text-gray-900 hover:text-gray-600"
                  >
                    {item.name}
                  </a>
                  <p className="text-gray-500">{item.desc}</p>
                </div>
                <div className="flex-shrink-0 pr-2">
                  <button
                    type="button"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="sr-only">Open options</span>

                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
