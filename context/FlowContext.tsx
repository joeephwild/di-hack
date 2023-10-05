import React, { createContext, useContext, useEffect, useState } from "react";
import * as fcl from "@onflow/fcl";
import { useRouter } from "next/router";


// Define the structure of the Flow context state
type FlowContextType = {
  currentUser: any;
  logIn: () => Promise<void>;
  // logOut: () => void;
  setActive: React.Dispatch<React.SetStateAction<string>>;
  active: string;
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // openWallet: () => Promise<void>;
};

// Create the context with default values
const FlowContext = createContext<FlowContextType | undefined>(undefined);

// Custom hook to use the Flow context
export const useFlow = () => useContext(FlowContext);

// Provider component to wrap around components that need access to the context
export const FlowProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState();
  const [active, setActive] = useState("learn");
  const [modalOpen, setModalOpen] = useState(false);
  // console.log(currentUser);
  const route = useRouter();

  // Log in function
  const logIn = async () => {
    try {
      fcl.authenticate();
      const res = fcl
        .currentUser()
        .subscribe((user) =>
          user ? setCurrentUser(user) : setCurrentUser(null)
        );
      if (res) {
        route.push("/dashboard");
      }
    } catch (error) {
      alert("error connectting wallet");
      console.error(error);
    }
  };

  // Log out function
  const logOut = async () => {
    try {
      const res = fcl.unauthenticate();
      route.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  // // Effect to initialize Magic when the component mounts
  useEffect(() => {
    const getCurrentUser = async () => {
      const res = fcl
        .currentUser()
        .subscribe((user) =>
          user ? setCurrentUser(user) : setCurrentUser(null)
        );
    };
    getCurrentUser();
  }, [currentUser]);

  return (
    <FlowContext.Provider
      value={{
        currentUser,
        logIn,
        // logOut,
        setActive,
        active,
        modalOpen,
        setModalOpen,
        // openWallet,
      }}
    >
      {children}
    </FlowContext.Provider>
  );
};
