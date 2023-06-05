import type { AppProps } from "next/app";
import "../../sass/index.scss";

export default function App({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}
