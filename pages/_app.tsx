import "../styles/globals.css";
<<<<<<< HEAD
import DefaultLayout from "../layouts/DefaultLayout";
import Navbar from '../components/Navbar';

// Import FCL config
import "../config/fcl";
import { FlowProvider, useFlow } from "../context/FlowContext";
import { UserProvider } from "../context/UserContext";

=======
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
>>>>>>> 262fb3d54ce9eb86272f4ae92aac58e232fafdae

function MyApp({ Component, pageProps }) {

  return (
    <FlowProvider>
<<<<<<< HEAD
      <DefaultLayout>

         <UserProvider> 
          <Navbar />
        <Component {...pageProps} />
         </UserProvider> 
      </DefaultLayout>
=======
      <ContractProvider>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </ContractProvider>
>>>>>>> 262fb3d54ce9eb86272f4ae92aac58e232fafdae
    </FlowProvider>
  );
}

export default MyApp;