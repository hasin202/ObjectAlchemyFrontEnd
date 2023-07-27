import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const DropDown: React.FC = () => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          Guides
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1 flex flex-col">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="https://app.tango.us/app/workflow/Using-Object-Alchemy-to-generate-your-dummy-data--Step-by-Step-Instructions-98ed3cc3b3b14bbca65d6b5f98f9ddf5"
                  className={`"block px-4 py-2 text-sm" ${
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                  }`}
                  target="_blank"
                >
                  Standard Generation
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="https://app.tango.us/app/workflow/Using-Object-Alchemy-to-generate-your-dummy-data-with-images--Step-by-Step-Instructions-cea58ca2ae044570bee2b1451fc4138e"
                  className={`"block px-4 py-2 text-sm" ${
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                  }`}
                  target="_blank"
                >
                  Image Generation
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default DropDown;
