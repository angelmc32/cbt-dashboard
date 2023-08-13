import { type ChangeEvent, useEffect, useState } from "react";
import { type ExternalProvider } from "@ethersproject/providers";
import {
  EthersAdapter,
  type SafeAccountConfig,
  SafeFactory,
} from "@safe-global/protocol-kit";
import { ethers } from "ethers";
import { useAccount } from "wagmi";

import CreateForm from "~/components/community/CreateForm";
import { MinimalistConnectButton } from "~/components/web3/RainbowKitCustomConnectButton";
import useSupabaseClient from "~/hooks/useSupabaseClient";

import { useSession } from "next-auth/react";
import { api } from "~/utils/api";

const Create = () => {
  const [ethereumObj, setEthereumObj] = useState<ExternalProvider | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [nftImage, setNftImage] = useState<(File & { preview: string }) | null>(
    null
  );
  const [safeSdk, setSafeSdk] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  const [nameInputValue, setNameInputValue] = useState<string>("");
  const [symbolInputValue, setSymbolInputValue] = useState<string>("");
  const [descriptionInputValue, setDescriptionInputValue] =
    useState<string>("");

  const { address: userAddress } = useAccount();
  const { supabase, errorMsg } = useSupabaseClient();
  const { data: sessionData } = useSession();

  const { mutate: createCommunity, isLoading: isSubmittingCreateCommunity } =
    api.communities.create.useMutation({
      onSuccess: async ({ newCommunity }) => {
        if (!newCommunity) return;
        console.log("¡Tu Community Wallet fue registrada exitosamente!");
        const communityWalletAddress = await createCommunityWallet();
        if (!communityWalletAddress) {
          console.error("Safe wallet deployment failed");
          return;
        }
        console.log("¡Tu Community Wallet fue desplegada exitosamente!");
        addDeployedWallet({
          address: communityWalletAddress,
          communityId: newCommunity.id,
        });
      },
      onError: (error: { message: string }) => {
        console.log(error);
        const errorMsg = error.message || "Ocurrió un error";
        setIsLoading(false);
        console.error(errorMsg);
      },
    });

  const {
    mutate: addDeployedWallet,
    isLoading: isSubmittingAddDeployedWallet,
  } = api.communities.addDeployedWallet.useMutation({
    onSuccess: ({ updatedCommunity }) => {
      console.log(updatedCommunity);
      console.log("¡Tu Community Wallet fue registrada exitosamente!");
      deploySoulboundMembership();
      console.log("¡Tu SoulboundMembership fue desplegada exitosamente!");
      console.log("te mandamos a que acuñes tu membresía");
    },
    onError: (error: { message: string }) => {
      console.log(error);
      const errorMsg = error.message || "Ocurrió un error";
      setIsLoading(false);
      console.error(errorMsg);
    },
  });

  useEffect(() => {
    if (!hasLoaded) {
      setHasLoaded(true);
      setEthereumObj((window as unknown as WindowEthObj).ethereum);
    }
  }, [hasLoaded]);

  const createCommunityWallet = async () => {
    if (!userAddress || !ethereumObj) return;

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
        owners: [userAddress, "0x752c9459Bb3A76caFF270bbe7b8e20A71A67648A"],
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
      return newSafeAddress;
    } catch (error) {
      console.error(error);
    }
  };

  const uploadImage = async () => {
    console.log("uploading image to Supabase");
    if (!supabase) return;
    if (errorMsg) {
      console.error(errorMsg);
      return;
    }
    console.log(nftImage);
    try {
      const { data, error } = await supabase.storage
        .from("membership-nft-images")
        .upload(
          `public/${"community-test"}/test-${Date.now()}.png`,
          nftImage as File,
          {
            cacheControl: "3600",
            upsert: false,
          }
        );
      if (error) {
        console.error(error);
      } else {
        console.log("Success!");
        console.log(data);
        return data;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const uploadMetadata = () => {
    console.log("uploading image to Supabase");
    return;
  };

  const deploySoulboundMembership = () => {
    console.log("aquí va el código de ethers");
    return;
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    switch (name) {
      case "name":
        setNameInputValue(value);
        break;
      case "symbol":
        setSymbolInputValue(value);
        break;
      case "description":
        setDescriptionInputValue(value);
        break;
    }
    return;
  };

  const onSubmitHandler = async () => {
    const imgRes = await uploadImage();
    if (!imgRes?.path || !supabase) return;
    const { data: imageUri } = supabase.storage
      .from("membership-nft-images")
      .getPublicUrl(imgRes.path);

    const data = {
      name: nameInputValue,
      symbol: symbolInputValue,
      description: descriptionInputValue,
      imageUri: imageUri.publicUrl,
      deployedByAddress: userAddress as string,
    };

    createCommunity(data);

    // const communityWalletAddress = await createCommunityWallet();
    // console.log(sessionData?.user.id);

    // const nftMetadataObj = {
    //   name: "User 1",
    //   description: "I like to ape into memecoins",
    //   image: imageUri,
    // };
    // // console.log(imageUri);
    // const metadataUri = uploadMetadata();

    // const communityMembershipAddress = deployCommunityNFT();
  };

  return (
    <div className="page">
      <h1 className="mb-8 text-center text-poc_yellowPrimary-700">
        Create Community
      </h1>
      {/* <div className="flex gap-x-4">
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
      </div> */}
      {!userAddress ? (
        <MinimalistConnectButton connectBtnClasses="w-full rounded-md bg-poc_yellowPrimary-600 py-2 px-6 font-spaceGrotesk text-base font-medium text-white hover:bg-poc_yellowPrimary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-poc_yellowPrimary-600 md:text-lg" />
      ) : (
        <CreateForm
          isLoading={
            isLoading ||
            isSubmittingAddDeployedWallet ||
            isSubmittingCreateCommunity
          }
          nftImage={nftImage}
          setNftImage={setNftImage}
          nameInputValue={nameInputValue}
          symbolInputValue={symbolInputValue}
          descriptionInputValue={descriptionInputValue}
          setDescriptionInputValue={setDescriptionInputValue}
          onChangeHandler={onChangeHandler}
          onSubmitHandler={onSubmitHandler}
        />
      )}
    </div>
  );
};

export default Create;
