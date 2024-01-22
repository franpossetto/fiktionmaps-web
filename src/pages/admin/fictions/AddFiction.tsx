export const AddFiction = () => {
  return (
    <form className="pl-32 pt-6 lg:w-[900px] w-[90%]">
      <div className="overflow-hidden bg-white shadow sm:rounded-lg px-4 py-6 sm:px-6">
        <h1 className="text-black text-3xl font-bold mb-5">
          Add a new Fiction
        </h1>
        <h2 className="text-black text-lg">
          To add a Fiction, write the name in the Search, it will look
          information in 3rd parties APIs.
        </h2>

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
    </form>
  );
};
