import { type ReactNode } from "react";

type TPrimaryButtonProps = {
  children: ReactNode;
  className?: string;
  onClickHandler?: React.MouseEventHandler<HTMLButtonElement>;
  size: string;
};

export const PrimaryButton = ({
  children,
  className = "",
  onClickHandler,
  size,
}: TPrimaryButtonProps) => {
  let classModifier = "px-6 py-2 text-base font-medium";
  switch (size) {
    case "sm":
      classModifier = "px-4 py-1.5 text-small font-medium";
      break;
    case "md":
      classModifier = "px-6 py-2 text-base font-medium";
      break;
    case "lg":
      classModifier = "px-8 py-2.5 text-lg font-semibold";
      break;
    case "xl":
      classModifier = "px-8 py-3 text-xl font-semibold";
      break;
    case "none":
      classModifier = "py-2";
      break;
    default:
      "px-6 py-2 text-base";
      break;
  }
  return (
    <button
      type="button"
      className={`items-center rounded-md bg-poc_yellowPrimary-600 text-white hover:bg-poc_yellowPrimary-700 ${className} ${classModifier}`}
      onClick={onClickHandler}
    >
      {children}
    </button>
  );
};
