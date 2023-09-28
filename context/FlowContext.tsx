import React, { createContext, useContext, useEffect, useState } from "react";
import { Magic } from "magic-sdk";
import * as fcl from "@onflow/fcl";
import { magic } from "../lib/magic";

// Define the structure of the Flow context state
type FlowContextType = {
  currentUser: any;
  logIn: (emailAddress: string) => Promise<void>;
  logOut: () => void;
  setActive: React.Dispatch<React.SetStateAction<string>>;
  active: string;
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// Create the context with default values
const FlowContext = createContext<FlowContextType | undefined>(undefined);

// Custom hook to use the Flow context
export const useFlow = () => useContext(FlowContext);

// Provider component to wrap around components that need access to the context
export const FlowProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [active, setActive] = useState("learn");
  const [modalOpen, setModalOpen] = useState(false);

  // Log in function
  const logIn = async (emailAddress: string) => {
    await magic.auth.loginWithMagicLink({ email: emailAddress });
    const currentUser = await magic.user.getMetadata();
    setCurrentUser(currentUser);
  };

  // Log out function
  const logOut = async () => {
    await magic.user.logout();
    setCurrentUser(null);
  };

  // Effect to initialize Magic when the component mounts
  useEffect(() => {
    const getCurrentUser = async () => {
      const res = await magic.user.isLoggedIn();
      if (res) {
        const user = await magic.user.getMetadata();
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    };
    getCurrentUser();
  }, [currentUser]);

  return (
    <FlowContext.Provider
      value={{
        currentUser,
        logIn,
        logOut,
        setActive,
        active,
        modalOpen,
        setModalOpen,
      }}
    >
      {children}
    </FlowContext.Provider>
  );
};

// import React, { createContext, useContext, useEffect, useState } from "react";
// import Web3 from "web3";
// import { magic } from "../lib/magic";

// // Define the structure of the Web3 context state
// type Web3ContextType = {
//   web3: Web3 | null;
//   initializeWeb3: () => void;
// };

// // Create the context with default values
// const Web3Context = createContext<Web3ContextType>({
//   web3: null,
//   initializeWeb3: () => {},
// });

// // Custom hook to use the Web3 context
// export const useWeb3 = () => useContext(Web3Context);

// // Provider component to wrap around components that need access to the context
// export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
//   // State variable to hold an instance of Web3
//   const [web3, setWeb3] = useState<Web3 | null>(null);

//   // Initialize Web3
//   const initializeWeb3 = async () => {
//     // Get the provider from the Magic instance
//     const provider = await magic.wallet.getProvider();

//     // Create a new instance of Web3 with the provider
//     const web3 = new Web3(provider);

//     // Save the instance to state
//     setWeb3(web3);
//   };

//   // Effect to initialize Web3 when the component mounts
//   useEffect(() => {
//     initializeWeb3();
//   }, []);

//   return (
//     <Web3Context.Provider
//       value={{
//         web3,
//         initializeWeb3,
//       }}
//     >
//       {children}
//     </Web3Context.Provider>
//   );
// };
