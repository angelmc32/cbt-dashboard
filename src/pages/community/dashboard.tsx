import React, { useEffect, useState } from "react";
import { type ExternalProvider } from "@ethersproject/providers";
import { useAccount } from "wagmi";
import SimpleLoader from "~/components/common/SimpleLoader";
import Link from "next/link";
import SoulboundMembership from "~/contracts/localhost/SoulboundMembership.json";
import CommunityBoundERC20 from "~/contracts/localhost/CommunityBoundERC20.json";
import { api } from "~/utils/api";
import { type BigNumber, ethers } from "ethers";
import { useGetTxReceipt } from "~/hooks/useGetTxReceipt";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [addressInputValue, setAddressInputValue] = useState("");
  const [ethereumObj, setEthereumObj] = useState<ExternalProvider | null>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const [currentBalance, setCurrentBalance] = useState<number | null>(null);
  const [txHashState, setTxHashState] = useState("");
  const [txReceiptState, setTxReceiptState] = useState<unknown>();
  const { address: userAddress } = useAccount();
  const {
    data: userDeployedCommunities,
    isLoading,
    isFetching,
  } = api.communities.getUserDeployedCommunities.useQuery({
    address: userAddress as string,
  });

  useEffect(() => {
    if (!ethereumObj)
      setEthereumObj((window as unknown as WindowEthObj).ethereum);
    if (!hasMounted) setHasMounted(true);
  }, [ethereumObj, hasMounted]);

  const getCbtBalance = async () => {
    console.log(userAddress);
    if (!ethereumObj) return;
    const provider = new ethers.providers.Web3Provider(ethereumObj);
    const accounts = (await ethereumObj.request?.({
      method: "eth_requestAccounts",
    })) as string[];
    const signer = provider.getSigner(accounts[0]);
    const CommunityBoundERC20Contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_LOCAL_CBT_ERC20_ADDRESS!,
      CommunityBoundERC20.abi,
      signer
    );
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      const res: BigNumber = await CommunityBoundERC20Contract.balanceOf(
        userAddress
      );
      console.log(res);
      console.log(parseInt(res._hex));
      const balance = parseInt(res._hex);
      setCurrentBalance(balance / (1 * 10 ** 18));
    } catch (error) {
      console.error(error);
    }
  };

  const getDrip = async () => {
    if (!ethereumObj) return;
    const provider = new ethers.providers.Web3Provider(ethereumObj);
    const accounts = (await ethereumObj.request?.({
      method: "eth_requestAccounts",
    })) as string[];
    const signer = provider.getSigner(accounts[0]);
    const CommunityBoundERC20Contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_LOCAL_CBT_ERC20_ADDRESS!,
      CommunityBoundERC20.abi,
      signer
    );
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      const tx = await CommunityBoundERC20Contract.getDrip();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (!tx.hash) return;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const txReceipt = await provider.getTransactionReceipt(tx.hash as string);
      if (txReceipt?.blockNumber) {
        setTxReceiptState(txReceipt);
      } else return { data: null, errorMsg: "Something went wrong" };
    } catch (error) {
      console.error(error);
      toast.error("CBT: Cooling period has not ended");
    }
  };

  const checkNftBalanceOfAddress = async () => {
    if (!ethereumObj) return;
    const provider = new ethers.providers.Web3Provider(ethereumObj);
    const accounts = (await ethereumObj.request?.({
      method: "eth_requestAccounts",
    })) as string[];
    const signer = provider.getSigner(accounts[0]);
    const soulboundMembershipContract = new ethers.Contract(
      process.env.NEXT_PUBLIC_LOCAL_SOULBOUND_MEMBERSHIP_ADDRESS!,
      SoulboundMembership.abi,
      signer
    );
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      const res: BigNumber = await soulboundMembershipContract.balanceOf(
        addressInputValue
      );
      console.log(res);
      console.log(parseInt(res._hex));
      return parseInt(res._hex);
    } catch (error) {
      console.error(error);
      toast.error(
        "Unable to check balance of NFT, please double-check the address"
      );
    }
  };

  return (
    <div className="page !px-0">
      <h1>Community Dashboard</h1>
      {hasMounted ? (
        !userAddress ? (
          <h3>Open menu to connect wallet</h3>
        ) : (
          <div className="w-full overflow-x-clip">
            <div className="my-8 flex w-full flex-col justify-center gap-y-4 px-8">
              <div className="border-1 flex w-full items-center justify-around rounded-md border border-poc_blueSecondary-500 py-3 text-base">
                <p>CBT Balance</p>
                <div className="flex items-center gap-x-6">
                  <p>{currentBalance ?? "N/A"}</p>
                  <button onClick={() => void getCbtBalance()}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="w-full text-center">
                <div className="mt-0.5">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full rounded-md border-0 px-4 py-3 text-center text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-base placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-poc_yellowPrimary-600 sm:leading-6"
                    placeholder="New fren address e.g. 0xAb01..."
                    onChange={(event) =>
                      setAddressInputValue(event.currentTarget.value)
                    }
                    value={addressInputValue}
                  />
                </div>
              </div>
              <div className="flex w-full justify-center gap-x-4">
                <button
                  className="w-2/5 rounded-md bg-primary py-2"
                  onClick={() => void checkNftBalanceOfAddress()}
                >
                  Invite
                </button>
                <button
                  className="flex w-2/5 items-center justify-center gap-x-2 rounded-md bg-primary py-2"
                  onClick={() => void getDrip()}
                >
                  Get Drip{" "}
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
            <table className="max-w-full overflow-x-clip">
              <thead>
                <tr className="w-full">
                  <th
                    scope="col"
                    className="px-1 py-4 text-center text-lg font-semibold text-gray-900"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-1 py-4 text-center text-lg font-semibold text-gray-900"
                  >
                    Wallet
                  </th>
                  <th
                    scope="col"
                    className="px-1 py-4 text-center text-lg font-semibold text-gray-900"
                  >
                    NFT
                  </th>
                  <th scope="col" className="relative">
                    To do
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {isLoading || isFetching ? (
                  <tr>
                    <td className="mx-auto">
                      <SimpleLoader />
                    </td>
                    <td className="mx-auto">
                      <SimpleLoader />
                    </td>
                    <td className="mx-auto">
                      <SimpleLoader />
                    </td>
                    <td className="mx-auto">
                      <SimpleLoader />
                    </td>
                  </tr>
                ) : (
                  userDeployedCommunities?.map((community, index) => (
                    <tr key={community.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-left text-sm font-medium text-gray-900">
                        {community.name}
                      </td>
                      <td className="whitespace-nowrap px-1 py-4 text-sm text-gray-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className={`h-8 w-8 ${
                            community.address ?? index === 0
                              ? "text-green-700"
                              : "text-neutral-200"
                          }`}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
                          />
                        </svg>
                      </td>
                      <td className="whitespace-nowrap px-1 py-2 text-sm">
                        {community.communityAddress ?? index === 0 ? (
                          <div className="h-10 w-10 rounded-full border-2 border-poc_blueSecondary-500 bg-poc_yellowPrimary-500" />
                        ) : (
                          <div className="h-10 w-10 rounded-full border border-dashed border-gray-400 bg-neutral-100" />
                        )}
                      </td>
                      <td className="relative flex justify-center py-4 pl-1 pr-4 text-right text-sm font-medium">
                        {!community.address && index !== 0 ? (
                          <button className="rounded-md bg-poc_yellowPrimary-600 px-2 py-1.5 text-sm">
                            Wallet
                          </button>
                        ) : !community.communityAddress && index !== 0 ? (
                          <button className="rounded-md bg-poc_blueSecondary-500 px-2 py-1.5 text-sm text-poc_whiteAlmost">
                            Membership
                          </button>
                        ) : (
                          <Link
                            href={`/community/${community.address ?? "demo"}`}
                            className="px-2 py-1.5 text-sm"
                          >
                            Explore
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )
      ) : (
        <SimpleLoader />
      )}
    </div>
  );
};

export default Dashboard;
