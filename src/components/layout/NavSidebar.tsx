import { Transition } from "@headlessui/react";
import { Disclosure } from "@headlessui/react";
import { Fragment } from "react";
import Link from "next/link";
import { MinimalistConnectButton } from "../web3/RainbowKitCustomConnectButton";

type TNavSidebarProps = {
  isOpen: boolean;
  navLinks: {
    name: string;
    href: string;
  }[];
  pathname: string;
  showConnection: boolean;
};

const NavSidebar = ({
  isOpen,
  navLinks,
  pathname,
  showConnection,
}: TNavSidebarProps) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Disclosure.Panel>
        {({ close }) => (
          <div className="relative z-30">
            <div className="fixed inset-0" />

            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
                  <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <div className="pointer-events-auto w-screen max-w-md">
                      <div className="flex h-[100vh] flex-col bg-primary px-4 sm:px-6 lg:px-8">
                        <div className="mt-1.5 flex h-16 items-center justify-end md:mt-1 lg:mt-1.5">
                          <div className="flex gap-x-4">
                            <div className="mr-2 flex items-center">
                              <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-0 text-white hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary">
                                <span className="sr-only">Close panel</span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="block h-9 w-9 rounded-md bg-poc_blueSecondary-700 p-1"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </Disclosure.Button>
                            </div>
                          </div>
                        </div>
                        <div className="mt-6 flex h-full flex-col justify-between px-4 sm:px-6">
                          <ul className="font-bigCalsonFb text-xl font-medium uppercase text-poc_blueSecondary-700">
                            {navLinks.map((navLink, index) => (
                              <li
                                key={`${navLink.name}_link_${index}`}
                                className={`mb-1 w-full rounded-md p-2 ${
                                  pathname == navLink.href
                                    ? "bg-hiroGreen-300"
                                    : ""
                                }`}
                                onClick={() => close()}
                              >
                                <Link
                                  href={navLink.href}
                                  className="block w-full"
                                >
                                  {navLink.name}
                                </Link>
                              </li>
                            ))}
                            {showConnection && (
                              <li>
                                <MinimalistConnectButton
                                  accountBtnClasses="text-md flex w-3/5 items-center justify-between rounded-md border-2 border-poc_blueSecondary-700 bg-transparent px-4 py-2 font-spaceGrotesk font-medium text-poc_blueSecondary-700 hover:bg-poc_whiteAlmost focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-poc_blueSecondary-700 md:text-lg"
                                  accountContainerClasses="flex w-full justify-center items-center gap-x-4"
                                  chainClasses="flex w-auto items-center text-base text-poc_blueSecondary"
                                  containerClasses="w-full my-8 flex justify-center"
                                  connectBtnText="Connect wallet"
                                  connectBtnClasses="text-md w-2/3 rounded-md bg-poc_blueSecondary-700 py-2 px-5 font-spaceGrotesk font-medium text-white hover:bg-poc_yellowPrimary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-poc_yellowPrimary-600"
                                />
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Transition.Child>
                </div>
              </div>
            </div>
          </div>
        )}
      </Disclosure.Panel>
    </Transition.Root>
  );
};

export default NavSidebar;
