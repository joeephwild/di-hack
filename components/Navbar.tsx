import * as fcl from "@onflow/fcl";
import useCurrentUser from "../hooks/useCurrentUser";
import { useFlow } from "../context/FlowContext";
import { magic } from "../lib/magic";
import Image from "next/image";
import { book, korean, profile } from "../assets/images";
import { BellIcon } from "@heroicons/react/solid";
import ConnectModal from "./ConnectModal";
import Link from "next/link";

export default function Navbar() {
  const user = useCurrentUser();
  // Get the initializeWeb3 function from the Web3 context
  const { logIn, currentUser, modalOpen, setModalOpen } = useFlow();
  return (
    <div>
      <div className="flex items-center justify-between w-full border-b border-Grey pt-[17px] pb-[14px] px-[14px]">
        <div className=""></div>
        <div>
          {!currentUser && (
            <button
              className="bg-Accent py-[10px]  px-[24px]"
              onClick={() => setModalOpen(!modalOpen)}
            >
              Connect Wallet
            </button>
          )}

          {currentUser && (
            <div className="flex items-center space-x-10 w-full">
              <Link href="/beAMentor">
              <button className="bg-Orange/50 text-Orange flex space-x-[10px] items-center py-[10px] px-[24px]">
                <Image
                  src={book}
                  alt="book"
                  className="w-[20px] h-[20px] object-contain"
                />
                Become a mentor
              </button>
              </Link>

              <Image
                src={korean}
                alt="language"
                className="w-[35.2px] h-[24px] object-contain"
              />

              <BellIcon className="text-[#667185] w-[28px]" />

              <button className="flex items-center space-x-[10px]">
                <Image
                  src={profile}
                  alt="profile"
                  className="w-[20px] h-[20px] text-Black object-cover rounded-full"
                />
                <span className="text-Black">
                  {currentUser.publicAddress.slice(0, 6)}...{" "}
                  {currentUser.publicAddress.slice(10, 18)}
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
      {modalOpen && <ConnectModal />}
    </div>
  );
}
