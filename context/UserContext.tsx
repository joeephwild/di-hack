import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useFlow } from "./FlowContext";

// Define the type for the user context.
type UserContextType = {
  checkIfUserExist: () => void;
  selectedSpeakLanguage: any
  selectedLearnLanguage: any
};

// Create a context for user data.
const UserContext = createContext<UserContextType | null>(null);

// Custom hook for accessing user context data.
export const useUser = () => useContext(UserContext);

// Provider component that wraps parts of the app that need user context.
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedSpeakLanguage, setSelectedSpeakLanguage] = useState(null);
  const [selectedLearnLanguage, setSelectedLearnLanguage] = useState(null);
  const router = useRouter();
  const { currentUser } = useFlow();

  // Load the selected languages from localStorage on component mount
  useEffect(() => {
    const storedSpeakLanguage = localStorage.getItem("selectedSpeakLanguage");
    if (storedSpeakLanguage) {
      setSelectedSpeakLanguage(storedSpeakLanguage);
    }

    const storedLearnLanguage = localStorage.getItem("selectedLearnLanguage");
    if (storedLearnLanguage) {
      setSelectedLearnLanguage(storedLearnLanguage);
    }
  }, []);

  const checkIfUserExist = () => {
    if (selectedLearnLanguage && selectedSpeakLanguage && currentUser) {
      router.push("/dashboard");

      return "user full authenticated";
    } else if (
      !selectedLearnLanguage &&
      !selectedSpeakLanguage &&
      currentUser
    ) {
      router.push("/profileOnboarding");
      return "user not fully authenticated";
    } else if (
      !selectedLearnLanguage &&
      !selectedSpeakLanguage &&
      !currentUser
    ) {
      router.push("/");
      return "no user";
    }
  };

  //   useEffect(() => {
  //     if (currentUser && selectedLearnLanguage && selectedSpeakLanguage) {
  //       router.push("/dashboard");
  //     } else {
  //       router.push("/");
  //     }
  //   }, []);

  const value = {
    checkIfUserExist,
    selectedLearnLanguage,
    selectedSpeakLanguage
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
