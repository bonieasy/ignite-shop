import { AppProps } from "next/app";
import React from "react";
import { globalStyles } from "../styles/global";
import logoImg from '../assets/ignite-shop-logo.svg';
import { Container, Header } from "../styles/pages/app";
import Image from "next/image";
import { Handbag } from '@phosphor-icons/react';


globalStyles()

export default function App({ Component, pageProps }: AppProps) {

  return (
    <Container>
      <Header>
        <Image src={logoImg.src} alt="" width={129} height={52} />
        <div className='bag'>
            <Handbag size={32} />
            <span className="cartCount"> 5 </span>
        </div>
      </Header>

      <Component {...pageProps} />
    </Container>
  
  )
}
