import "../styles/globals.css";
import DefaultLayout from "../layouts/DefaultLayout";

// Import FCL config
import "../config/fcl";
import { FlowProvider, useFlow } from "../context/FlowContext";
import { UserProvider } from "../context/UserContext";
// import { UserProvider } from "../context/UserContext";

function MyApp({ Component, pageProps }) {
  return (
    <FlowProvider>
      <UserProvider>
      <Component {...pageProps} />
      <ChatApp />
      </UserProvider>
    </FlowProvider>
  );
}

export default MyApp;
