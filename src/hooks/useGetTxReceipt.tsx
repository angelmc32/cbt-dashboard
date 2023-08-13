import { type ExternalProvider } from "@ethersproject/providers";
import { ethers } from "ethers";
import { useState, useEffect } from "react";

export const useGetTxReceipt = (transactionHash: string) => {
  const [ethereumObj, setEthereumObj] = useState<ExternalProvider | null>(null);
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setEthereumObj((window as unknown as WindowEthObj).ethereum);
    setHasMounted(true);
  }, []);

  try {
    if (!hasMounted || !ethereumObj) return { errorMsg: "No ethereum object" };
    const provider = new ethers.providers.Web3Provider(ethereumObj);
    provider
      .getTransactionReceipt(transactionHash)
      .then((txReceipt) => {
        if (txReceipt?.blockNumber) {
          return { data: txReceipt };
        } else return { data: null, errorMsg: "Something went wrong" };
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    return { error, errorMsg: "Unable to initialize hook" };
  }
};
