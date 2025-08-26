import Layout from "@components/Layout";
import { Global } from "@emotion/react";
import { queryClient } from "@shared/utils/reactQuery";
import globalStyles from "@styles/globalReset";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect } from "react";
import { QueryClientProvider } from "react-query";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window !== undefined) {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>ONEDAY KOREA</title>
      </Head>
      <Global styles={globalStyles} />
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </>
  );
}
