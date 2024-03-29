import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';

import CloseIcon from '../Icons/CloseIcon';

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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-zinc-50 px-4 pt-5 pb-6 text-left shadow-xl transition-all dark:bg-zinc-800 sm:my-8 sm:h-full sm:w-full sm:max-w-xl sm:p-6">
                <div className="flex w-full justify-end">
                  <button
                    type="button"
                    className="-mr-1 flex p-2"
                    onClick={modalController}
                  >
                    <span className="sr-only">Dismiss</span>
                    <CloseIcon
                      className="h-6 w-6
                      text-zinc-600 dark:text-zinc-300"
                      aria-hidden="true"
                    />
                  </button>
                </div>
                {position && (
                  <div className="relative">
                    <span
                      className="absolute top-4 left-5 -ml-px h-[95%] w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                    <div className="relative flex items-center justify-between align-middle">
                      <div className="flex items-baseline gap-5">
                        <a
                          href={position.companyWebsite}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:ring-0">
                            <Image
                              src={position.companyLogoUrl}
                              alt={position.company}
                              width={40}
                              height={40}
                              className="h-7 w-7"
                            />
                          </span>
                        </a>
                        <a
                          href={position.companyWebsite}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <h2 className="text-lg font-bold text-black dark:text-zinc-300 md:text-xl">
                            {position.company} - {position.title}
                          </h2>
                        </a>
                      </div>
                    </div>
                    <p className="whitespace-nowrap3 px-16 pb-3 text-sm text-gray-500">
                      {position.start} - {position.end}
                    </p>
                    <div>
                      <ul className="max-h-96 list-disc overflow-y-scroll pl-16 pr-0 sm:h-full">
                        {position.responsibilities.map(
                          (responsibility, index) => (
                            <li
                              key={index}
                              className="text-black dark:text-zinc-300"
                            >
                              <p className="text-sm text-black dark:text-zinc-300">
                                {responsibility}
                              </p>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
