import { Main } from "next/document";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
        <Component {...pageProps} />
    </>
  );
}
