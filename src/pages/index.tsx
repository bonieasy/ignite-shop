import { HomeContainer, Product } from "../styles/pages/home";
import Image from "next/image";
import { stripe } from "../lib/stripe";
import { GetStaticProps } from "next";
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css'
import Stripe from "stripe";
import Link from "next/link";
import Head from "next/head";

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
  }[]
}

export default function Home({ products }: HomeProps) {

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2.5,
      spacing: 48,
    },
  })

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">

        {products.map((product) => {
          return (
            <Link href={`/product/${product.id}`} key={product.id} prefetch={false}>
              <Product key={product.id} className="keen-slider__slide">
                <Image src={product.imageUrl} width={520} height={480} alt="camiseta" />
                <footer>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </footer>
              </Product>
            </Link>
          )
        })}
        
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  });
    
  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price
    console.log(product)
    
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('DE', {
        style: 'currency',
        currency: 'EUR',
      }).format(price.unit_amount / 100),
      priceId: price.id,
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}
