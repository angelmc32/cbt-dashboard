import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import Image from "next/image";

type TButtonProps = {
  accountBtnClasses?: string;
  accountContainerClasses?: string;
  chainClasses?: string;
  connectBtnClasses?: string;
  connectBtnText?: string;
  containerClasses?: string;
};

export const MinimalistConnectButton = ({
  accountBtnClasses,
  accountContainerClasses,
  chainClasses,
  connectBtnClasses,
  connectBtnText = "Connect wallet",
  containerClasses = "",
}: TButtonProps) => {
  const [hasMounted, setHasMounted] = useState(false);
  // Hooks
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Render
  if (!hasMounted) {
    return null;
  } else {
    return (
      <div className={containerClasses}>
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openAccountModal,
            openConnectModal,
            openChainModal,
            mounted,
          }) => {
            const connected = mounted && account && chain;

            return (
              <>
                {(() => {
                  if (!connected) {
                    return (
                      <button
                        className={
                          connectBtnClasses ??
                          "w-full rounded-md bg-poc_yellowPrimary-600 px-4 py-2 font-spaceGrotesk text-base font-medium text-white hover:bg-poc_yellowPrimary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-poc_yellowPrimary-600 md:text-lg"
                        }
                        onClick={openConnectModal}
                        type="button"
                      >
                        {connectBtnText}
                      </button>
                    );
                  }

                  if (chain.unsupported) {
                    return (
                      <button
                        className="flex w-full items-center justify-center gap-x-4 rounded-md bg-poc_blueSecondary-700/75 py-2 font-spaceGrotesk text-base font-medium text-white hover:bg-poc_yellowPrimary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-poc_yellowPrimary-600 md:w-1/2 md:text-lg lg:w-3/5 lg:text-xl"
                        onClick={openChainModal}
                        type="button"
                      >
                        <span>Wrong network</span>
                        <ChevronDownIcon className="ml-2 h-6 w-4 sm:ml-0" />
                      </button>
                    );
                  }

                  return (
                    <div
                      className={
                        accountContainerClasses ??
                        "flex w-full items-center gap-x-4"
                      }
                    >
                      <button
                        onClick={openChainModal}
                        className={
                          chainClasses ??
                          "flex w-1/2 items-center text-xs text-poc_whiteAlmost"
                        }
                        type="button"
                      >
                        {chain.hasIcon && (
                          <div
                            style={{
                              background: chain.iconBackground,
                              width: 12,
                              height: 12,
                              borderRadius: 999,
                              overflow: "hidden",
                              marginRight: 4,
                            }}
                          >
                            {chain.iconUrl && (
                              <Image
                                alt={chain.name ?? "Chain icon"}
                                src={chain.iconUrl}
                                className="h-4 w-4"
                                height={16}
                                width={16}
                              />
                            )}
                          </div>
                        )}
                        {chain.name}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="ml-1 h-3 w-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={openAccountModal}
                        type="button"
                        className={
                          accountBtnClasses ??
                          "flex w-1/2 items-center justify-between rounded-md border-2 border-poc_blueSecondary-700 bg-transparent px-4 py-2 font-spaceGrotesk text-base font-medium text-poc_blueSecondary-700 hover:bg-poc_whiteAlmost focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-poc_blueSecondary-700 md:text-lg"
                        }
                      >
                        <span className="w-5/6 text-center">
                          {account.displayName}
                        </span>
                        <span>
                          <ChevronDownIcon className="h-6 w-4" />
                        </span>
                      </button>
                    </div>
                  );
                })()}
              </>
            );
          }}
        </ConnectButton.Custom>
      </div>
    );
  }
};
