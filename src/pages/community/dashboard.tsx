import React, { useEffect, useState } from "react";
import { type ExternalProvider } from "@ethersproject/providers";
import { useAccount } from "wagmi";
import SimpleLoader from "~/components/common/SimpleLoader";
import Link from "next/link";
import SoulboundMembership from "~/contracts/zora-goerli/SoulboundMembership.json";
import CommunityBoundERC20 from "~/contracts/zora-goerli/CommunityBoundERC20.json";
import { api } from "~/utils/api";
import { type BigNumber, ethers } from "ethers";

import toast from "react-hot-toast";

const DEMO_COMMUNITY_ID = "cll92f3170000lig66zxcvhgo";

const Dashboard = () => {
  const [addressInputValue, setAddressInputValue] = useState("");
  const [CBTvalues, setCBTValues] = useState([23, 7, -23, 10]);
  const [isLoading, setIsLoading] = useState(false);
  const communityMembershipAddress =
    process.env.NEXT_PUBLIC_LOCAL_DEMO_COMMUNITY_MEMBERSHIP_ADDRESS!;
  const [ethereumObj, setEthereumObj] = useState<ExternalProvider | null>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const [currentBalance, setCurrentBalance] = useState<number | null>(null);
  const [txReceiptState, setTxReceiptState] = useState<unknown>();
  const { address: userAddress } = useAccount();
  const {
    data: demoCommunity,
    isFetching,
    refetch: refetchDemoCommunity,
  } = api.communities.getOneCommunity.useQuery({
    communityId: DEMO_COMMUNITY_ID,
  });

  const { mutate: addCommunityMember } =
    api.communities.addCommunityMember.useMutation({
      onSuccess: async ({ updatedCommunity }) => {
        if (!updatedCommunity) {
          setIsLoading(false);
          toast.error(
            "We were unable to register the new member to the Community"
          );
          return;
        }
        await refetchDemoCommunity();
        toast.success("New Member added successfully");
      },
      onError: (error: { message: string }) => {
        console.log(error);
        const errorMsg = error.message || "Ocurrió un error";
        setIsLoading(false);
        console.error(errorMsg);
      },
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

  const sendCBT = async (toAddress: string, index: number) => {
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
      const tx = await CommunityBoundERC20Contract.adminMint(
        toAddress,
        ethers.utils.parseUnits("3", "ether")
      );
      console.log(tx);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (!tx.hash) return;

      if (!CBTvalues) return;
      const userBalance = CBTvalues[index];
      if (!userBalance) return;
      const newCBTValues = [...CBTvalues];
      newCBTValues[index] = userBalance + 3;
      console.log(newCBTValues);
      setCBTValues(newCBTValues);
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

  const isMembershipOwner = async () => {
    if (!ethereumObj) return;
    const provider = new ethers.providers.Web3Provider(ethereumObj);
    const accounts = (await ethereumObj.request?.({
      method: "eth_requestAccounts",
    })) as string[];
    const signer = provider.getSigner(accounts[0]);
    const soulboundMembershipContract = new ethers.Contract(
      communityMembershipAddress,
      SoulboundMembership.abi,
      signer
    );
    try {
      console.log(addressInputValue);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      const res: BigNumber = await soulboundMembershipContract.balanceOf(
        addressInputValue
      );
      console.log(res);
      console.log(parseInt(res._hex));
      return parseInt(res._hex) > 0;
    } catch (error) {
      console.error(error);
      toast.error(
        "Unable to check balance of NFT, please double-check the address"
      );
    }
  };

  const inviteCommunityMember = async () => {
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
      const isNewAddressMembershipOwner = await isMembershipOwner();
      if (!isNewAddressMembershipOwner) {
        toast.error(
          "Unable to add member: Entered address is not a Membership holder"
        );
        return;
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      const tx = await CommunityBoundERC20Contract.addCommunityMember(
        addressInputValue,
        communityMembershipAddress
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (!tx.hash) return;

      setAddressInputValue("");
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const txReceipt = await provider.getTransactionReceipt(tx.hash as string);
      if (txReceipt?.blockNumber) {
        setTxReceiptState(txReceipt);
        addCommunityMember({
          newMemberAddress: addressInputValue,
          communityId: DEMO_COMMUNITY_ID,
        });
      } else return { data: null, errorMsg: "Something went wrong" };
    } catch (error) {
      console.error(error);
      toast.error("CBT: Cooling period has not ended");
    }
  };

  const onboardCommunityMember = async () => {
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

    const soulboundMembershipContract = new ethers.Contract(
      communityMembershipAddress,
      SoulboundMembership.abi,
      signer
    );
    try {
      const isNewAddressMembershipOwner = await isMembershipOwner();
      if (isNewAddressMembershipOwner) {
        toast.error(
          "Unable to onboard member: Address already is a Membership holder"
        );
        return;
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      const sbtTx = await soulboundMembershipContract.safeMint(
        addressInputValue,
        "https://bafybeidemy4bh75vx25ln3jcn5tnqb25b5u6q62hqtuy26bbikbddgvizu.ipfs.nftstorage.link/nft-0",
        { value: ethers.utils.parseEther("0.0000777") }
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (!sbtTx.hash) {
        toast.error("An error occured while minting Soulbound Membership");
        return;
      }
      setAddressInputValue("");
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      const cbtTx = await CommunityBoundERC20Contract.addCommunityMember(
        addressInputValue,
        communityMembershipAddress
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (!cbtTx.hash) {
        toast.error("An error occured while adding member to CBT");
        return;
      }

      const newCBTValues = [...CBTvalues];
      newCBTValues.push(23);
      console.log(newCBTValues);
      setCBTValues(newCBTValues);

      const txReceipt = await provider.getTransactionReceipt(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        cbtTx.hash as string
      );
      if (txReceipt?.blockNumber) {
        setTxReceiptState(txReceipt);
        addCommunityMember({
          newMemberAddress: addressInputValue,
          communityId: DEMO_COMMUNITY_ID,
        });
      } else return { data: null, errorMsg: "Something went wrong" };
    } catch (error) {
      console.error(error);
      toast.error("CBT: Cooling period has not ended");
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
                  className="w-1/3 rounded-md bg-primary py-2"
                  onClick={() => void onboardCommunityMember()}
                >
                  Onboard
                </button>
                <button
                  className="w-1/3 rounded-md bg-primary py-2"
                  onClick={() => void inviteCommunityMember()}
                >
                  Add
                </button>
                <button
                  className="flex w-1/3 items-center justify-center gap-x-2 rounded-md bg-primary py-2"
                  onClick={() => void getDrip()}
                >
                  Drip{" "}
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
            <table className="w-full overflow-x-clip">
              <thead>
                <tr className="w-full">
                  <th
                    scope="col"
                    className="px-1 py-4 text-center text-lg font-semibold text-gray-900"
                  >
                    Member
                  </th>
                  <th
                    scope="col"
                    className="px-1 py-4 text-center text-lg font-semibold text-gray-900"
                  >
                    CBT
                  </th>
                  <th
                    scope="col"
                    className="px-1 py-4 text-center text-lg font-semibold text-gray-900"
                  >
                    Send
                  </th>
                  <th scope="col" className="relative">
                    View
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
                  demoCommunity?.members &&
                  (demoCommunity?.members).length > 0 &&
                  (demoCommunity?.members).map((member, index) => (
                    <tr key={member}>
                      <td className="py-4 pl-4 pr-3 text-center text-sm font-medium text-gray-900">
                        <Link
                          href={`https://testnet.explorer.zora.energy/address/${member}`}
                          target="_blank"
                        >
                          <span className="lg:hidden">
                            {member.slice(0, 6)}...{member.slice(-4)}
                          </span>
                          <span className="hidden lg:block">{member}</span>
                        </Link>
                      </td>
                      <td className="flex items-center justify-center whitespace-nowrap px-1 py-4 text-sm text-gray-500">
                        {CBTvalues[index]}
                      </td>
                      <td className="whitespace-nowrap px-1 text-sm">
                        <button
                          className="rounded-md bg-poc_yellowPrimary-600 px-2 py-1.5 text-sm"
                          onClick={() => void sendCBT(member, index)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-6 w-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                            />
                          </svg>
                        </button>
                      </td>
                      <td className="relative flex justify-center py-4 pl-1 pr-4 text-right text-sm font-medium">
                        <button className="rounded-md bg-poc_yellowPrimary-600 px-2 py-1.5 text-sm">
                          Profile
                        </button>
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
