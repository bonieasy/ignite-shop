import { AppProps } from "next/app";
import React from "react";
import { globalStyles } from "../styles/global";
import logoImg from '../assets/ignite-shop-logo.svg';
import { Container, Header } from "../styles/pages/app";
import Image from "next/image";

globalStyles()

export default function App({ Component, pageProps }: AppProps) {

  return (
    <Container>
      <Header>
        <Image src={logoImg.src} alt="" width={129} height={52} />
      </Header>

      <Component {...pageProps} />
    </Container>
  
  )
}
