import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import LogoComponent from "../common/LogoComponent";
import Link from "next/link";
import { MinimalistConnectButton } from "../web3/RainbowKitCustomConnectButton";
import NavSidebar from "./NavSidebar";

const navigation = [
  { name: "Home", href: "/", onlyMobile: true },
  { name: "How it works?", href: "/how-it-works", onlyMobile: false },
  { name: "Communities", href: "/communities", onlyMobile: false },
  { name: "Events", href: "/events", onlyMobile: true },
  { name: "My Feed", href: "/feed", onlyMobile: true },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  const [showConnection, setShowConnection] = useState(false);

  // TODO: use pathname property once components are added
  const { asPath: pathname } = useRouter();

  useEffect(() => {
    setShowConnection(true);
  }, []);

  return (
    <Disclosure
      as="nav"
      className="sticky top-0 z-20 h-16 bg-poc_blueDarkOxford font-spaceGrotesk"
    >
      {({ open }) => (
        <>
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <Link className="flex flex-shrink-0 items-center" href="/">
                  <LogoComponent />
                  <span className="ml-2 text-lg font-medium text-white hover:text-primary md:text-xl">
                    Proof of Community
                  </span>
                </Link>
              </div>
              <div className="hidden md:ml-6 md:flex md:items-center md:space-x-2 lg:space-x-4">
                {navigation.map(
                  (item) =>
                    !item.onlyMobile && (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.href === pathname
                            ? "text-white underline decoration-primary decoration-2 underline-offset-8"
                            : "text-poc_whiteAlmost hover:text-white",
                          "rounded-md px-3 py-2 font-medium hover:bg-gray-700 hover:ring-1 hover:ring-inset hover:ring-primary md:text-base"
                        )}
                        aria-current={
                          item.href === pathname ? "page" : undefined
                        }
                      >
                        {item.name}
                      </Link>
                    )
                )}
                {showConnection && (
                  <div className="hidden items-center lg:flex">
                    <MinimalistConnectButton
                      accountBtnClasses="text-md flex items-center justify-between rounded-md border-2 border-poc_whiteAlmost-700 bg-transparent px-4 py-2 font-spaceGrotesk font-medium text-poc_blueSecondary-700 hover:bg-poc_blueSecondary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-poc_blueSecondary-700 text-poc_whiteAlmost"
                      connectBtnText="Connect"
                      connectBtnClasses="text-md w-full rounded-md bg-poc_yellowPrimary-600 py-2 px-5 font-spaceGrotesk font-medium text-white hover:bg-poc_yellowPrimary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-poc_yellowPrimary-600"
                    />
                  </div>
                )}
              </div>
              <div className="flex items-center lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-0 text-white hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary">
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon className="block h-9 w-9 p-1" aria-hidden="true" />
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <NavSidebar
            showConnection={showConnection}
            isOpen={open}
            navLinks={navigation}
            pathname={pathname}
          />
        </>
      )}
    </Disclosure>
  );
};

export default Header;
