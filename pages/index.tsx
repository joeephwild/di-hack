import Head from "next/head";
import Image from "next/image";
import { useFlow } from "../context/FlowContext";
import ConnectModal from "../components/ConnectModal";
import { flow, hero, hero2, logo, magic } from "../assets/images";
import Link from "next/link";
import { verify } from "../lib/magic";
import { authenticate } from "@onflow/fcl";

export default function Home() {
  const { logIn, currentUser, modalOpen, setModalOpen } = useFlow();
  return (
    <div>
      <Head>
        <title>Lancent: A Language space for Web3 Enthusiast</title>
        <meta
          name="description"
          content="Lancent Language learning in the web3 space"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex items-start h-screen overflow-y-scroll">
          {/* Left Section */}
          <div className="w-[60%] h-screen">
            <div className="flex flex-col m-[120px] w-[660px]">
              {/* Logo Header */}
              <div className="flex items-center space-x-9">
                <Image src={logo} alt="logo" className="w-[58px] h-[58px]" />
                <span className="text-Black text-[32px] font-bold">
                  Lancent
                </span>
              </div>
              {/* Logo Header ends */}
              <div className="mt-[110px]">
                <h1 className="w-[556px] text-Black text-[40px] font-normal leading-[56px]">
                  The all-in-one language platform that will take you from zero
                  to
                  <span className="text-Accent font-bold"> hero</span>
                </h1>
                {currentUser?.addr && (
                  <Link href="/dashboard">
                    <button className="bg-Accent w-full mt-[95px] text-Black font-bold py-[15px] rounded-[8px]">
                      Dashboard
                    </button>
                  </Link>
                )}
                {!currentUser?.addr && (
                  <button
                    onClick={authenticate}
                    className="bg-Accent w-full mt-[95px] text-Black font-bold py-[15px] rounded-[8px]"
                  >
                    Get Started
                  </button>
                )}

                <div
                  onClick={verify}
                  className="flex items-center text-Grey justify-center"
                >
                  <span>Secured by</span>
                  <Image
                    src={magic}
                    alt="magic"
                    className="w-[103px] h-[48px] object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Left Section */}

          {/* Right Section */}
          <div className="w-[40%] my-[101px] mr-[20px] max-h-[452px]">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-Accent w-[295px] h-[235px] rounded-[200px]"></div>
              <div className="relative">
                <Image
                  src={hero2}
                  alt="hero"
                  className="h-[418px] object-cover"
                />
              </div>
              <div className="relative">
                <Image src={hero} alt="hero" className="h-[361px] w-[295px]" />
              </div>
              <div className="bg-Black w-[295px] h-[235px] mt-[40px] rounded-[200px]"></div>
            </div>
            <div className="flex items-center text-Grey justify-end self-end">
              <span>Built on</span>
              <Image
                src={flow}
                alt="magic"
                className="w-[103px] h-[48px] object-contain ml-2"
              />
            </div>
          </div>

          {/* Right Section */}
        </div>
        {modalOpen && <ConnectModal />}
      </main>
    </div>
  );
}
