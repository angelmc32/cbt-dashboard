import { type Dispatch, type SetStateAction } from "react";
import { FileUploader } from "../file-uploader/FileUploader";
import NftImageUploader from "../file-uploader/NftImageUploader";

type TCreateFormProps = {
  nftImage: (File & { preview: string }) | null;
  setNftImage: Dispatch<SetStateAction<(File & { preview: string }) | null>>;
  onSubmitHandler: () => Promise<void>;
};
const CreateForm = ({
  nftImage,
  setNftImage,
  onSubmitHandler,
}: TCreateFormProps) => {
  return (
    <>
      <form className="flex w-full flex-col gap-y-4">
        <FileUploader
          accept={{ "image/*": [".png", ".jpeg"] }}
          multiple={false}
          maxSize={104857600}
          noDrag={true}
          InnerDropzone={<NftImageUploader preview={nftImage?.preview} />}
          onDrop={(acceptedFiles, rejectedFile) => {
            console.log(acceptedFiles, rejectedFile);
            setNftImage?.(() =>
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
      </form>
      <div className="relative my-6 w-full">
        <button
          type="button"
          className="items-center rounded-md bg-poc_yellowPrimary-600 px-8 py-2.5 text-lg font-semibold text-white hover:bg-poc_yellowPrimary-700"
          onClick={() => void onSubmitHandler()}
        >
          Create!
        </button>
      </div>
    </>
  );
};

export default CreateForm;
