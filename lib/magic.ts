import { Magic } from "magic-sdk";
import { FlowExtension } from "@magic-ext/flow";
import * as fcl from '@onflow/fcl';

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

// CONFIGURE ACCESS NODE
fcl.config().put('accessNode.api', 'https://rest-testnet.onflow.org');

// CONFIGURE WALLET
// replace with your own wallets configuration
// Below is the local environment configuration for the dev-wallet
fcl.config().put('challenge.handshake', 'http://access-001.devnet9.nodes.onflow.org:8000');

const AUTHORIZATION_FUNCTION = magic?.flow.authorization;

const verify = async () => {
 
};

export { magic, verify };