import { useContext, createContext, useEffect, useState } from "react";
import * as fcl from "@onflow/fcl";
import { getToken } from "../constants/contract";

fcl.config({
  "accessNode.api": "https://rest-testnet.onflow.org",
  "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn",
  "app.detail.icon":
    "https://di-hack.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.11b1a610.png&w=48&q=75",
  "app.detail.title": "Lacent Dapp",
});

type ContractContextType = {};

const ContractContext = createContext<ContractContextType | null>(null);

export const ContractProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  //   useEffect(() => {
  //     const configureFcl = () => {

  //     };
  //     configureFcl();
  //     getResult();
  //   }, []);

  const getResult = async () => {
    try {
      const result = await fcl.send([fcl.script(getToken)]).then(fcl.decode);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  const value = {};
  return (
    <ContractContext.Provider value={value}>
      {children}
    </ContractContext.Provider>
  );
};
