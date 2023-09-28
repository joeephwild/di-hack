import "../styles/globals.css";
import DefaultLayout from "../layouts/DefaultLayout";

// Import FCL config
import "../config/fcl";
import { FlowProvider } from "../context/FlowContext";
// import { UserProvider } from "../context/UserContext";

function MyApp({ Component, pageProps }) {
  return (
    <FlowProvider>
      <DefaultLayout>
        {/* <UserProvider> */}
        <Component {...pageProps} />
        {/* </UserProvider> */}
      </DefaultLayout>
    </FlowProvider>
  );
}

export default MyApp;
