import Head from "next/head";

export default function Home() {
  // const { loggedIn } = useCurrentUser()

  return (
    <div>
      <Head>
        <title>FCL Next Scaffold</title>
        <meta
          name="description"
          content="Lancent Language learning in the web3 space"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="text-[#000]">hello worl</main>
    </div>
  );
}
