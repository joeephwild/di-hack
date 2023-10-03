import "../styles/globals.css";
import DefaultLayout from "../layouts/DefaultLayout";
import Navbar from '../components/Navbar';

// Import FCL config
import "../config/fcl";
import { FlowProvider, useFlow } from "../context/FlowContext";
import { UserProvider } from "../context/UserContext";


function MyApp({ Component, pageProps }) {

  return (
    <FlowProvider>
      <DefaultLayout>

         <UserProvider> 
          <Navbar />
        <Component {...pageProps} />
         </UserProvider> 
      </DefaultLayout>
    </FlowProvider>
  );
}

export default MyApp;