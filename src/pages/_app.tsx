import { AppProps } from "next/app";
import React from "react";
import { globalStyles } from "../styles/global";
import { Container } from "../styles/pages/app";
import { CartProvider } from "use-shopping-cart";
import { Header } from "../components/Header/header";

globalStyles()

export default function App({ Component, pageProps }: AppProps) {

  return (
      <CartProvider
        mode="payment"
        cartMode="client-only"
        stripe={process.env.STRIPE_PUBLIC_KEY}
        successUrl="http://localhost:3000/success"
        cancelUrl="http://localhost:3000/"
        currency="EUR"
        allowedCountries={['BR', 'DE']}
        billingAddressCollection={true}
        shouldPersist={true}
        
      >
        
          <Container>
            <Header />
            <Component {...pageProps} />
          </Container>
      </CartProvider>
    
  
  )
}
