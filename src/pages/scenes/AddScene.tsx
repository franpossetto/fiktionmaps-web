import { useEffect, useState } from "react";
import { SearchPlace } from "../../components/places/SearchPlace";

export const AddScene = () => {
  const [place, setPlace] = useState();

  return (
    <form className="pl-32 pt-6 lg:w-[900px] w-[90%]">
      <div className="overflow-hidden bg-white shadow sm:rounded-lg px-4 py-6 sm:px-6">
        <h1 className="text-black text-3xl font-bold mb-5">Add a new Scene</h1>
        <h2 className="text-black text-lg">
          To add a new Scene, select the Fiction and add information about the
          Scene. The location is mandatory!
        </h2>

        {/* ... Rest of the code ... */}

        {/* 1. Radio Buttons */}
        <div className="mt-10 space-x-4 flex items-center">
          <div className="flex items-center">
            <input
              id="movie"
              name="genre"
              type="radio"
              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <label
              htmlFor="movie"
              className="block text-sm font-medium leading-6 text-gray-900 ml-2"
            >
              Movie
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="tv-show"
              name="genre"
              type="radio"
              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <label
              htmlFor="tv-show"
              className="block text-sm font-medium leading-6 text-gray-900 ml-2"
            >
              TV Show
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="book"
              name="genre"
              type="radio"
              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <label
              htmlFor="book"
              className="block text-sm font-medium leading-6 text-gray-900 ml-2"
            >
              Book
            </label>
          </div>
        </div>
        {/* 2. Fiction Name */}
        <div className="mt-4">
          <label
            htmlFor="fiction-name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Fiction Name
          </label>
          <input
            type="text"
            name="fiction-name"
            id="fiction-name"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        {/* 3. Scene Name */}
        <div className="mt-4">
          <label
            htmlFor="scene-name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Scene Name
          </label>
          <input
            type="text"
            name="scene-name"
            id="scene-name"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        {/* 4. Scene Description */}
        <div className="mt-4">
          <label
            htmlFor="scene-description"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Scene Description
          </label>
          <textarea
            id="scene-description"
            name="scene-description"
            rows={3}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            defaultValue={""}
          />
        </div>

        {/* 5. Location */}
        <div className="mt-4">
          <label
            htmlFor="location"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Location
          </label>
          <SearchPlace setPlace={setPlace} place={place} />

          {/* Buttons at the bottom */}
          <div className="flex justify-end gap-x-6 mt-5">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
