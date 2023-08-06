import React from "react";
import { MinimalistConnectButton } from "~/components/web3/RainbowKitCustomConnectButton";

const Login = () => {
  return (
    <div className="page">
      <h1>Login</h1>
      <div className="w-full flex justify-center">
        <div className="w-3/5 md:w-1/3 lg:w-1/4 xl:w-1/5">
          <MinimalistConnectButton />
        </div>
      </div>
    </div>
  );
};

export default Login;
