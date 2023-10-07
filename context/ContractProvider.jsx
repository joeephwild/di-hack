import { useContext, createContext, useEffect, useState } from "react";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/typedefs";
import { claimNFTS, createPodcast, getToken } from "../constants/contract";
import { useFlow } from "./FlowContext";

fcl.config({
  "accessNode.api": "https://rest-testnet.onflow.org",
  "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn",
  "app.detail.icon":
    "https://di-hack.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.11b1a610.png&w=48&q=75",
  "app.detail.title": "Lacent Dapp",
});


const ContractContext = createContext();

// Custom hook to use the Flow context
export const useContract = () => useContext(ContractContext);

export const ContractProvider = ({
  children,
}) => {
  const { currentUser } = useFlow();
  const claimNft = async () => {
    try {
      const authorization = fcl.currentUser().authorization;
      const res = await fcl.mutate({
        cadence: claimNFTS,
        args: (arg, t) => [
          arg(
            "https://di-hack.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbadge1.bbfbffbc.png&w=128&q=75",
            t.String
          ),
          arg("Level 1 Korean Badge", t.String),
        ],
        payer: authorization,
        limit: 9999,
        proposer: authorization,
        authorizations: [authorization],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const uploadAPodcast = async () => {
    try {
      const authorization = fcl.currentUser().authorization;
      const res = await fcl.mutate({
        cadence: createPodcast,
        args: (arg, t) => [
          arg(
            "https://di-hack.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbadge1.bbfbffbc.png&w=128&q=75",
            t.String
          ),
          arg("Level 1 Korean Badge", t.String),
        ],
        payer: authorization,
        limit: 9999,
        proposer: authorization,
        authorizations: [authorization],
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getResult();
  }, []);

  const getResult = async () => {
    try {
      const result = await fcl.query({
        cadence: getToken,
        args: (args, t) => [args("0x2c97b417412b01cb", t.Address)],
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  const value = {
    claimNft,
    uploadAPodcast,
  };
  return (
    <ContractContext.Provider value={value}>
      {children}
    </ContractContext.Provider>
  );
};
