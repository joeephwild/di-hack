import "../styles/globals.css";
import { FlowProvider } from "../context/FlowContext";
import { UserProvider } from "../context/UserContext";
import { ContractProvider } from "../context/ContractProvider";
import * as fcl from "@onflow/fcl";

fcl.config({
  "accessNode.api": "https://rest-testnet.onflow.org",
  "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn",
  "app.detail.icon":
    "https://di-hack.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.11b1a610.png&w=48&q=75",
  "app.detail.title": "Lacent Dapp",
});

function MyApp({ Component, pageProps }) {

  return (
    <FlowProvider>
      <ContractProvider>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </ContractProvider>
    </FlowProvider>
  );
}

export default MyApp;