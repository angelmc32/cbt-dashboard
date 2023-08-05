import React from "react";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

import styles from "./layout.module.css";

type TLayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: TLayoutProps) => {
  return (
    <>
      <Head>
        <title>Proof of Community</title>
        <meta
          name="description"
          content="Connect with your members and boost your engagement"
        />
        <link rel="icon" href="/images/logos/logo-proof-of-community-white-256.png" />
      </Head>
      <Header />
      <main className={`flex w-full items-center bg-poc_blueDarkOxford ${styles.main}`}>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
