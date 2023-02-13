import type { AppProps } from "next/app";
import "../globals/globals.css";

export default function _app({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
