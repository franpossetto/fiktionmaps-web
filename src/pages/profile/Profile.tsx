import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { UserService } from "../../services/UserService";
import { UserDTO, UserRole } from "../../types/dto/UserDTO";
import PlaceTable from "../../components/places/placeTable/PlaceTable";

interface UserObject {
  name?: string;
  email?: string;
  country?: string;
  about?: string;
}
export const Profile = () => {
  const [editing, setEditing] = useState(false);
  const [userObject, setUserObject] = useState<UserObject>();
  const [name, setName] = useState("");
  const { user } = useAuthContext();
  const [loggedUser, setLoggedUser] = useState<any>();

  const userService = new UserService();

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    setEditing(false);
    const userDto: UserDTO = {
      name: loggedUser?.name || "",
      email: loggedUser.email || "",
      externalUserId: user.uid,
      password: "",
      role: UserRole.USER,
      id: loggedUser?.id.toString(),
      country: loggedUser.country,
    };

    await userService.update(userDto);
    setUserObject(undefined);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const getUserInfo = async () => {
    const userService = new UserService();
    const response = await userService.getCurrentUser();
    setLoggedUser(response);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoggedUser((prevState: any) => ({ ...prevState, name: e.target.value }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoggedUser((prevState: any) => ({
      ...prevState,
      email: e.target.value,
    }));
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoggedUser((prevState: any) => ({
      ...prevState,
      country: e.target.value,
    }));
  };

  return (
    <>
      <div className="pl-32 pr-12 pt-6 lg:w-[100%] w-[90%]">
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
          <div className="px-4 py-3 sm:px-6">
            <h3 className="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
              Personal information.
            </p>
          </div>
          <div className="border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">Full name</dt>
                <div className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {editing ? (
                    <input
                      type="text"
                      value={loggedUser?.name}
                      onChange={handleNameChange}
                      className="border rounded px-3 py-2 w-full h-8"
                    />
                  ) : (
                    <dd
                      className={`mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 h-10 flex items-center ${
                        loggedUser?.name ? "" : "italic text-gray-400"
                      }`}
                    >
                      {loggedUser?.name || "Not Specified"}
                    </dd>
                  )}
                </div>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">
                  Email address
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {editing ? (
                    <input
                      type="text"
                      value={loggedUser?.email}
                      onChange={handleEmailChange}
                      className="border rounded px-3 py-2 w-full h-10"
                    />
                  ) : (
                    <dd
                      className={`mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 h-10 flex items-center ${
                        loggedUser?.email ? "" : "italic text-gray-400"
                      }`}
                    >
                      {loggedUser?.email || "Not Specified"}
                    </dd>
                  )}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">Country</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {editing ? (
                    <input
                      type="text"
                      value={loggedUser?.country}
                      onChange={handleCountryChange}
                      className="border rounded px-3 py-2 w-full h-10"
                    />
                  ) : (
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 h-10 flex items-center">
                      <dd
                        className={`mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 h-10 flex items-center ${
                          loggedUser?.country ? "" : "italic text-gray-400"
                        }`}
                      >
                        {loggedUser?.country || "Not Specified"}
                      </dd>
                    </dd>
                  )}
                </dd>
              </div>
            </dl>
          </div>
          <div className="flex justify-end px-4 py-6 sm:gap-4 sm:px-6 bg-slate-100 ">
            <div className="text-sm font-medium leading-6 text-gray-900">
              {editing ? (
                <>
                  <button
                    className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                  <button
                    className="rounded-md bg-white ml-3 px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  className="rounded-md bg-white ml-3 px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  onClick={handleEdit}
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
