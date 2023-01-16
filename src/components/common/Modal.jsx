import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';

export default function Modal({ isModalOpen, modalController, position }) {
  return (
    <Transition.Root show={isModalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={modalController}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-zinc-50 px-4 pt-5 pb-4 text-left shadow-xl transition-all dark:bg-zinc-800 sm:my-8 sm:w-full sm:max-w-xl sm:p-6">
                <div className="relative">
                  <span
                    className="absolute top-4 left-5 -ml-px h-[95%] w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                  <div className="relative flex justify-between">
                    <div>
                      <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:ring-0">
                        <Image
                          src={position.companyLogoUrl}
                          alt={position.company}
                          width={40}
                          height={40}
                          className="h-7 w-7"
                        />
                      </span>
                    </div>
                    <div className="min-w-0 space-x-4 pt-1.5">
                      <p className="whitespace-nowrap3 text-sm text-gray-500">
                        {position.start} - {position.end}
                      </p>
                    </div>
                  </div>
                  <div>
                    <ul className="list-disc px-16 text-black dark:text-zinc-300">
                      {position.responsibilities.map(
                        (responsibility, index) => (
                          <li key={index}>
                            <p className="text-sm text-black dark:text-zinc-300">
                              {responsibility}
                            </p>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
