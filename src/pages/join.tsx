import { useState } from "react";
import { PrimaryButton } from "~/components/buttons";

const Join = () => {
  const [pageHeading, setPageHeading] = useState<string>("Join a Community")

  const handleHeadingChange = (heading: string) => {
    setPageHeading(heading)
  }
  return (
    <div className="page">
      <h1 className="text-center text-poc_yellowPrimary-700 mb-8">
        {pageHeading}
      </h1>
      <div className="w-full md:w-1/2 lg:w-1/3 flex items-center justify-center gap-x-2">
        <PrimaryButton className="w-2/5" size="none" onClickHandler={() => handleHeadingChange("Join existing Community")}>Join</PrimaryButton>
        <PrimaryButton className="w-2/5" size="none" onClickHandler={() => handleHeadingChange("Create your Community")}>Create</PrimaryButton>
      </div>
    </div>
  );
};

export default Join;
