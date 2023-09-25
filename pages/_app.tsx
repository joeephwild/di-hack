import "../styles/globals.css";
import DefaultLayout from "../layouts/DefaultLayout";

// Import FCL config
import "../config/fcl";
import { Sidebar } from "../components";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <div className="flex items-start">
        <Sidebar />
        <div className="flex items-center justify-between py-[15px] px-[42px] border-b-2 border-Grey w-full ">
          <div></div>
          <div>
            <button className="bg-Accent px-[19px] py-2.5 text-[16px] font-medium text-Black rounded-[6px]">
              Connect Wallet
            </button>
          </div>
        </div>
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
