import { Tab } from "@headlessui/react";
import { useState } from "react";
import { MinimalistConnectButton } from "../web3/RainbowKitCustomConnectButton";
import { FileUploader } from "../file-uploader/FileUploader";
import NftImageUploader from "../file-uploader/NftImageUploader";

type TCreateFormProps = {
  userAddress: string;
};
const CreateForm = ({ userAddress }: TCreateFormProps) => {
  const [nftImage, setNftImage] = useState<File & { preview: string }>();
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    "Your Community",
    "First Members",
    "On-chain Fun",
    "Review & Deploy",
  ];

  const handlePrevBtnClick = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
    return;
  };

  const handleNextBtnClick = () => {
    if (currentStep < steps.length - 2) {
      setCurrentStep(currentStep + 1);
    }
    return;
  };

  return (
    <>
      <form className="flex w-full flex-col gap-y-4">
        <Tab.Group selectedIndex={currentStep} onChange={setCurrentStep}>
          <Tab.List as="div" className="hidden">
            <Tab
              as="div"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-poc_blueSecondary-700 text-poc_whiteAlmost"
            >
              1
            </Tab>
            <Tab
              as="div"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-poc_blueSecondary-700 text-poc_whiteAlmost"
            >
              2
            </Tab>
            <Tab
              as="div"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-poc_blueSecondary-700 text-poc_whiteAlmost"
            >
              3
            </Tab>
          </Tab.List>
          <Tab.Panels className="w-full">
            <Tab.Panel as="div" className="flex w-full flex-col gap-y-4">
              <FileUploader
                accept={{ "image/*": [".png", ".jpeg"] }}
                multiple={false}
                maxSize={104857600}
                noDrag={true}
                InnerDropzone={<NftImageUploader preview={nftImage?.preview} />}
                onDrop={(acceptedFiles, rejectedFile) => {
                  console.log(acceptedFiles, rejectedFile);
                  setNftImage(() =>
                    Object.assign(acceptedFiles[0] as File, {
                      preview: URL.createObjectURL(acceptedFiles[0] as Blob),
                    })
                  );
                }}
              />
              <div className="w-full text-left">
                <label
                  htmlFor="email"
                  className="ml-2 block text-base font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-0.5">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full rounded-md border-0 px-4 py-3 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-base placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-poc_yellowPrimary-600 sm:leading-6"
                    placeholder="e.g. Degen Frens Club"
                  />
                </div>
              </div>

              <div className="w-full text-left">
                <label
                  htmlFor="symbol"
                  className="ml-2 block text-base font-medium leading-6 text-gray-900"
                >
                  Symbol
                </label>
                <div className="mt-0.5">
                  <input
                    type="text"
                    name="symbol"
                    id="symbol"
                    className="block w-full rounded-md border-0 px-4 py-3 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-base placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-poc_yellowPrimary-600 sm:leading-6"
                    placeholder="e.g. DEGENS"
                  />
                </div>
              </div>
              <div className="w-full text-left">
                <label
                  htmlFor="email"
                  className="ml-2 block text-base font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-0.5">
                  <textarea
                    name="description"
                    id="description"
                    rows={5}
                    className="block w-full rounded-md border-0 px-4 py-3 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-base placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-poc_yellowPrimary-600 sm:leading-6"
                    placeholder="Tell other people a bit about your community, e.g. Just degens who invest together"
                  />
                </div>
              </div>
            </Tab.Panel>
            <Tab.Panel as="div" className="flex w-full flex-col gap-y-4">
              {userAddress ? (
                <div className="w-full text-left">
                  <label
                    htmlFor="address"
                    className="ml-2 block text-base font-medium leading-6 text-gray-900"
                  >
                    Address
                  </label>
                  <div className="mt-0.5">
                    <input
                      type="text"
                      name="address"
                      id="address"
                      className="block w-full rounded-md border-0 px-4 py-3 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-base placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-poc_yellowPrimary-600 sm:leading-6"
                      disabled
                      value={userAddress}
                    />
                  </div>
                </div>
              ) : (
                <MinimalistConnectButton
                  accountBtnClasses="text-md flex w-3/5 items-center justify-between rounded-md border-2 border-poc_blueSecondary-700 bg-transparent px-4 py-2 font-spaceGrotesk font-medium text-poc_blueSecondary-700 hover:bg-poc_whiteAlmost focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-poc_blueSecondary-700 md:text-lg"
                  accountContainerClasses="flex w-full justify-center items-center gap-x-4"
                  chainClasses="flex w-auto items-center text-xs text-poc_blueSecondary"
                  containerClasses="w-full my-8 flex justify-center"
                  connectBtnText="Connect wallet"
                  connectBtnClasses="text-md w-2/3 rounded-md bg-poc_blueSecondary-700 py-2 px-5 font-spaceGrotesk font-medium text-white hover:bg-poc_yellowPrimary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-poc_yellowPrimary-600"
                />
              )}
            </Tab.Panel>
            <Tab.Panel as="div" className="flex w-full flex-col gap-y-4">
              <FileUploader
                accept={{ "image/*": [".png", ".jpeg"] }}
                multiple={false}
                maxSize={104857600}
                noDrag={true}
                InnerDropzone={<NftImageUploader preview={nftImage?.preview} />}
                onDrop={(acceptedFiles, rejectedFile) => {
                  console.log(acceptedFiles, rejectedFile);
                  setNftImage(() =>
                    Object.assign(acceptedFiles[0] as File, {
                      preview: URL.createObjectURL(acceptedFiles[0] as Blob),
                    })
                  );
                }}
              />

              <div className="w-full text-left">
                <label
                  htmlFor="email"
                  className="ml-2 block text-base font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-0.5">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full rounded-md border-0 px-4 py-3 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-base placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-poc_yellowPrimary-600 sm:leading-6"
                    placeholder="e.g. Degen Frens Club"
                  />
                </div>
              </div>
              <div className="w-full text-left">
                <label
                  htmlFor="email"
                  className="ml-2 block text-base font-medium leading-6 text-gray-900"
                >
                  Symbol
                </label>
                <div className="mt-0.5">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full rounded-md border-0 px-4 py-3 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-base placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-poc_yellowPrimary-600 sm:leading-6"
                    placeholder="e.g. Degen Frens Club"
                  />
                </div>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </form>

      <div className="relative my-6 w-full">
        <button
          className="text-md absolute left-0 rounded-md bg-poc_blueSecondary-700 p-3 font-spaceGrotesk font-medium text-white hover:bg-poc_blueSecondary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-poc_yellowPrimary-600"
          onClick={handlePrevBtnClick}
        >
          Back
        </button>
        <button
          className="text-md absolute right-0 rounded-md bg-poc_blueSecondary-700 p-3 font-spaceGrotesk font-medium text-white hover:bg-poc_blueSecondary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-poc_yellowPrimary-600"
          onClick={handleNextBtnClick}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default CreateForm;
