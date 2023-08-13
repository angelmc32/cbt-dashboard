import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import {
  RainbowKitSiweNextAuthProvider,
  type GetSiweMessageOptions,
} from "@rainbow-me/rainbowkit-siwe-next-auth";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";
import { wagmiConfig, chains } from "~/services/web3/wagmiClient";

import { api } from "~/utils/api";
import Layout from "~/components/layout/Layout";
import "~/styles/globals.css";
import { Toaster } from "react-hot-toast";

const getSiweMessageOptions: GetSiweMessageOptions = () => ({
  statement: "Sign in to Proof of Community",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <SessionProvider refetchInterval={0} session={session}>
        <RainbowKitSiweNextAuthProvider
          getSiweMessageOptions={getSiweMessageOptions}
        >
          <RainbowKitProvider chains={chains}>
            <Toaster
              containerClassName="flex justify-center"
              toastOptions={{
                className: "border-2 border-primary shadow-none text-center",
              }}
            />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </RainbowKitProvider>
        </RainbowKitSiweNextAuthProvider>
      </SessionProvider>
    </WagmiConfig>
  );
};

export default api.withTRPC(MyApp);
