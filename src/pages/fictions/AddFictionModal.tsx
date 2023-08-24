import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useFictionService } from "../../services/useFictionService";

interface LogoutModalProps {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setFictions: React.Dispatch<React.SetStateAction<any>>;
}

const AddFictionModal: React.FC<LogoutModalProps> = ({
  modalOpen,
  setModalOpen,
  setFictions
}) => {

    const [fictionName, setFictionName] = useState<string>('');
    const [year, setYear] = useState<number | string>('');
    const [type, setType] = useState<Type | string>('');

    const handleFictionNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFictionName(event.target.value);
      };
      
      const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setYear(event.target.value);
      };
      
      const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setType(event.target.value);
      };
      

    enum Type {
        MOVIE = 'MOVIE',
        BOOK = 'BOOK',
        TV_SHOW = 'TV_SHOW',
      }

      const { createFiction } = useFictionService();
      
      const handleCreateFictionClick = () => {
        const fiction = {
          name: fictionName,
          type: type,
        };
      
        createFiction(fiction)
        .then((response) => {
            setModalOpen(false);
        })
        .catch((error) => {
            console.error('Error creating fiction:', error);
        });
      };


    
  return (
    <Transition.Root show={modalOpen} as={Fragment}>
    <Dialog
      as="div"
      className="fixed z-10 inset-0 overflow-y-auto"
      onClose={setModalOpen}
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        {/* This element is to trick the browser into centering the modal contents. */}
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Add Fiction
                  </Dialog.Title>
                  <div className="mt-2 w-full">
                  <form>
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
                        value={fictionName}
                        onChange={handleFictionNameChange} />
                    <label
                        htmlFor="fiction-year"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Year
                    </label>
                    <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        id="fiction-year"
                        value={year}
                        onChange={handleYearChange}>
                        <option value="" disabled>
                            Year
                        </option>
                        {Array.from({ length: 2023 - 1800 + 1 }, (_, index) => (
                            <option key={index} value={2023 - index}>
                                {2023 - index}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="fiction-type"
                        className="block text-sm font-medium leading-6 text-gray-900">Type</label>
                    <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        id="fiction-type"
                        value={type}
                        onChange={handleTypeChange}>

                        <option value="" disabled>
                            Type
                        </option>
                        {Object.entries(Type).map(([key, value]) => (
                            <option key={key} value={value}>
                                {value}
                            </option>
                        ))}
                    </select>
                </form>

                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 flex justify-end">
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-800 text-base font-medium text-white hover:bg-slate-900 focus:outline-none  sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => {
                    handleCreateFictionClick()
                }}
              >
                Add Fiction2
              </button>
              <button
                type="button"
                className="ml-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:mr-3 sm:w-auto sm:text-sm"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </Transition.Child>
      </div>
    </Dialog>
  </Transition.Root>
  );
};

export default AddFictionModal;
