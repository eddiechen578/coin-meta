import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {Provider} from 'react-redux';
import {store} from '@/store/rootStore';
import Web3 from "web3";
import { Web3ReactProvider } from '@web3-react/core';

async function getLibrary(provider: any) {
    if (window.ethereum) {

        return new Web3(provider);

    }
}
export default function App({ Component, pageProps }: AppProps) {
  return(
      <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
      <Component {...pageProps} />
      </Provider>
      </Web3ReactProvider>
  )
}
