import { type ExternalProvider } from "@ethersproject/providers";

declare global {
  interface WindowEthObj {
    ethereum: ExternalProvider;
  }
}
