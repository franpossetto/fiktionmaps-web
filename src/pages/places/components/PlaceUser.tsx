import { User } from "../../../types/User";

interface PlaceUserProps {
  email: String | undefined;
}

export const PlaceUser: React.FC<PlaceUserProps> = ({ email }) => {
  return (
    <a className="block flex-1">
      <div className="relative flex min-w-0 flex-1 items-center">
        <span className="relative inline-block flex-shrink-0">
          {/* <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" /> */}
          {/* <span className="absolute top-[-0.15rem] right-[-0.15rem] flex h-4 w-4 items-center justify-center rounded-full bg-gray-900">
                    <StarIcon className="h-3 w-3 text-white" aria-hidden="true" />
                </span> */}
          <span className="absolute top-[-0.3rem] right-[-0.3rem] flex h-3 w-3 items-center justify-center rounded-full bg-emerald-400"></span>
        </span>
        <div className="ml-4 truncate">
          <p className="truncate text-sm font-medium text-gray-900">
            Created by
          </p>
          <p className="truncate text-sm text-gray-500">
            {email || "cannot load user"}
          </p>
        </div>
      </div>
    </a>
  );
};
