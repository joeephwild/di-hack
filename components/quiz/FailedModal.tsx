import { XIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { badges } from "../../assets/images";

const FailedModal = ({ closeModal, actionButton }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="w-[30%] bg-white px-12 py-12 rounded-2xl absolute left-[40%] top-[20%]">
        <div className="flex w-full justify-between">
          <h1 className="text-2xl font-semibold">You ran out of hearts!</h1>
          <div>
            <button onClick={closeModal}>
              <XIcon className="w-[20px] h-[20px] bg-Grey/20 text-white " />
            </button>
          </div>
        </div>
        <div className="my-8 w-full">
          <p className="text-gray-400 text-xl w-[85%]">
            Mistakes are our best teachers. G to the podcast and purchase a
            podcast, so you can beat this level and claim a free NFTS
          </p>
        </div>

        <div className="border border-1 rounded-2xl mb-4 flex flex-col justify-center items-center space-y-4 py-4">
          <Image src={badges} alt="badge" width={150} height={150} />
          <p className="text-xl font-bold">Level 1 Korean Badge</p>
        </div>
        <div className="w-full mt-8">
          <button
            className="bg-Accent w-full text-center rounded font-semibold py-4"
            onClick={actionButton}
          >
            Claim your NFT Badge
          </button>
        </div>
      </div>
    </div>
  );
};

export default FailedModal;
