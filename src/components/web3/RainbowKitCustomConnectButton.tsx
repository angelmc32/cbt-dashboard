import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

type TButtonProps = {
  accountBtnClasses?: string;
  connectBtnClasses?: string;
  connectBtnText?: string;
  containerClasses?: string;
};

export const MinimalistConnectButton = ({
  accountBtnClasses,
  connectBtnClasses,
  connectBtnText = "Connect wallet",
  containerClasses = "w-full",
}: TButtonProps) => {
  const [hasMounted, setHasMounted] = useState(false);
  // Hooks
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Render
  if (!hasMounted) return null;
  else
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
                          "text-md w-full rounded-md bg-poc_yellowPrimary-600 py-2 font-spaceGrotesk font-medium text-white hover:bg-poc_yellowPrimary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-poc_yellowPrimary-600 md:text-lg"
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
                        className="w-full rounded-md bg-poc_yellowPrimary-600 py-2 font-spaceGrotesk text-xl font-medium text-white hover:bg-poc_yellowPrimary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-poc_yellowPrimary-600 md:w-1/2 md:text-lg lg:w-3/5"
                        onClick={openChainModal}
                        type="button"
                      >
                        <span>Wrong network</span>
                        <ChevronDownIcon className="ml-2 h-6 w-4 sm:ml-0" />
                      </button>
                    );
                  }

                  return (
                    <button
                      onClick={openAccountModal}
                      type="button"
                      className={
                        accountBtnClasses ??
                        "text-md bg-red flex w-full items-center justify-between px-4 rounded-md border-2 border-poc_blueSecondary-700 py-2 font-spaceGrotesk font-medium text-poc_blueSecondary-700 hover:bg-poc_whiteAlmost focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-poc_blueSecondary-700 md:text-lg"
                      }
                    >
                      <span className="w-5/6 text-center">{account.displayName}</span>
                      <span>
                        <ChevronDownIcon className="h-6 w-4" />
                      </span>
                    </button>
                  );
                })()}
              </>
            );
          }}
        </ConnectButton.Custom>
      </div>
    );
};
