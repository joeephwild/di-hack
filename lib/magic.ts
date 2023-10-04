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
  try {

    console.log("SENDING TRANSACTION");
    // setVerifying(true);
    var response = await fcl.send([
      fcl.transaction`
    transaction {
      var acct: AuthAccount

      prepare(acct: AuthAccount) {
        self.acct = acct
      }

      execute {
        log(self.acct.address)
      }
    }
  `,
      fcl.proposer(AUTHORIZATION_FUNCTION),
      fcl.authorizations([AUTHORIZATION_FUNCTION]),
      fcl.payer(AUTHORIZATION_FUNCTION),
      fcl.limit(9999)
    ]);
    console.log("TRANSACTION SENT");
    console.log("TRANSACTION RESPONSE", response);

    console.log("WAITING FOR TRANSACTION TO BE SEALED");
    var data = await fcl.tx(response).onceSealed();
    console.log("TRANSACTION SEALED", data);

    if (data.status === 4 && data.statusCode === 0) {
      console.log("Congrats!!! I Think It Works");
    } else {
      console.log(`Oh No: ${data.errorMessage}`);
    }
  } catch (error) {
    console.error("FAILED TRANSACTION", error);
  }
};

export { magic, verify };