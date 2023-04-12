import React from "react";
import * as Dialog from '@radix-ui/react-dialog';
import BagModal from "../Bag/bagProducts";    
import logoImg from "../../assets/ignite-shop-logo.svg";
import { HeaderContainer } from "./styles";
import Image from "next/image";
import { Handbag } from '@phosphor-icons/react';
import Link from "next/link";
import { useShoppingCart } from 'use-shopping-cart';

export function Header() {
    const { cartCount } = useShoppingCart()
    
    return (
        <HeaderContainer>
            <Link href={"/"}>
                <Image src={logoImg.src} alt="" width={129} height={52} />
            </Link>

            <Dialog.Root>
                <Dialog.Trigger asChild>
                <button className='bag'>
                    <Handbag size={32} />
                    {cartCount! > 0 && <span>{cartCount}</span>}
                </button>

                </Dialog.Trigger>

                <BagModal />

            </Dialog.Root>
        </HeaderContainer>

    );
}
      
      
