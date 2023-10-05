import { XIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { badges, crying } from "../../assets/images";
import { useRouter } from "next/router";
import { useContract } from "../../context/ContractProvider";

const FailedModal = ({ closeModal, actionButton }) => {
  const route = useRouter()
  const {claimNft} = useContract()
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
            You have run out of lives. To further improve your knowledge,
            purchase a podcast and come back when you are ready!
          </p>
        </div>

        <div className="mb-4 flex flex-col justify-center items-center space-y-4 py-4">
          <Image
            src={crying}
            alt="crying"
            className="w-[190px] h-[190px] object-contain"
          />
        </div>
        <div className="w-full mt-8">
          <button
            className="bg-Accent w-full text-center rounded font-semibold py-4"
            // onClick={() => route.push("/podcast")}
            onClick={claimNft}
          >
            Go to podcast
          </button>
        </div>
      </div>
    </div>
  );
};

export default FailedModal;
