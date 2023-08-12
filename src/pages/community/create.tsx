import { useEffect, useState } from "react";
import { type ExternalProvider } from "@ethersproject/providers";
import {
  EthersAdapter,
  type SafeAccountConfig,
  SafeFactory,
} from "@safe-global/protocol-kit";
import { ethers } from "ethers";
import { useAccount } from "wagmi";

const Create = () => {
  const [safeSdk, setSafeSdk] = useState<unknown>(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [ethereumObj, setEthereumObj] = useState<ExternalProvider | null>(null);
  const { address, isConnected } = useAccount();
  // const provider = useEthersProvider({ chainId: 5 });

  useEffect(() => {
    if (!hasLoaded) {
      setHasLoaded(true);
      setEthereumObj((window as unknown as WindowEthObj).ethereum);
    }
  }, [hasLoaded]);

  const createCommunityWallet = async () => {
    if (!address || !ethereumObj) return;

    const provider = new ethers.providers.Web3Provider(ethereumObj);
    const accounts = (await ethereumObj.request?.({
      method: "eth_requestAccounts",
    })) as string[];
    console.log(accounts);

    const safeOwner = provider.getSigner(accounts[0]);
    console.log(safeOwner);

    try {
      const ethAdapter = new EthersAdapter({
        ethers,
        signerOrProvider: safeOwner,
      });
      console.log(ethAdapter.getSigner());
      console.log(ethAdapter);
      const safeAccountConfig: SafeAccountConfig = {
        owners: [address, "0x752c9459Bb3A76caFF270bbe7b8e20A71A67648A"],
        threshold: 1,
      };
      const safeFactory = await SafeFactory.create({
        ethAdapter,
        isL1SafeMasterCopy: true,
      });

      console.log(safeFactory);
      safeFactory.getAddress();
      const proxyAddress = safeFactory.getAddress();
      console.log(proxyAddress);

      const saltNonce = ethers.utils.hashMessage(
        safeAccountConfig.owners[0] + `${Date.now()}`
      );

      const _safeSdk = await safeFactory.deploySafe({
        safeAccountConfig,
        saltNonce,
        options: { gasLimit: 300000 },
      });
      console.log(_safeSdk);

      setSafeSdk(_safeSdk);

      const newSafeAddress = await _safeSdk.getAddress();
      console.log(newSafeAddress);
    } catch (error) {
      console.error(error);
    }
  };

  const logSdkObj = () => console.log(safeSdk);

  return (
    <div className="page">
      <h1 className="mb-8 text-center text-poc_yellowPrimary-700">
        Create Community
      </h1>
      <div className="flex gap-x-4">
        <button className="btn btn-sm rounded-md" onClick={logSdkObj}>
          Log SDK obj
        </button>
        {isConnected && (
          <button
            className="btn btn-sm rounded-md"
            onClick={() => void createCommunityWallet()}
          >
            Create Wallet
          </button>
        )}
      </div>
    </div>
  );
};

export default Create;
