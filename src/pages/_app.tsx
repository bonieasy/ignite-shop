import { AppProps } from "next/app";
import React from "react";
import { globalStyles } from "../styles/global";
import logoImg from '../assets/ignite-shop-logo.svg';
import { Container, Header } from "../styles/pages/app";
import Image from "next/image";
import { Handbag } from '@phosphor-icons/react';
import Link from "next/link";
import * as Dialog from '@radix-ui/react-dialog';
import BagModal from "../components/bagProducts";


globalStyles()

export default function App({ Component, pageProps }: AppProps) {

  return (
    <Container>
      <Header>
        <Link href={"/"}>
          <Image src={logoImg.src} alt="" width={129} height={52} />
        </Link>

        <Dialog.Root>
          <Dialog.Trigger asChild>

            <button className='bag'>
              <Handbag size={32} />
              <span className="cartCount"> 5 </span>
            </button>

          </Dialog.Trigger>

          <BagModal />

        </Dialog.Root>

      </Header>

      <Component {...pageProps} />
    </Container>
  
  )
}
