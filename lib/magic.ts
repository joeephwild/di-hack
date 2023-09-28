import { Magic } from "magic-sdk";
import { FlowExtension } from "@magic-ext/flow";

let magic;

if (typeof window !== 'undefined') {
  magic = new Magic("pk_live_6BED2B9F7091AF45", {
    extensions: [
      new FlowExtension({
        rpcUrl: "https://rest-testnet.onflow.org",
        network: "testnet", // testnet or mainnet to connect different network
      }),
    ],
  });
}

export { magic };