import { HomeContainer, Product } from "../styles/pages/home";
import Image from "next/image";
import { stripe } from "../lib/stripe";
import { GetStaticProps } from "next";
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css'
import Stripe from "stripe";
import Link from "next/link";
import Head from "next/head";
import { Handbag } from "@phosphor-icons/react";
import { useShoppingCart } from "use-shopping-cart";

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: number
    formattedPrice: number
  }[]
}

export default function Home({ products }: HomeProps) {
  const { addItem } = useShoppingCart()
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2.5,
      spacing: 48,
    },
  })

  function addItemToCart(product) {
    addItem({
      name: product.name,
      description: product.description,
      id: product.id,
      price: product.price,
      currency: 'EUR',
      image: product.imageUrl,
    }, {count: 1})
    console.log(`product: ${JSON.stringify(product)}`);
  }

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
                <Image src={product.imageUrl} width={520} height={480} alt="t-shirt" />
                <footer>
                  <div>
                    <strong>{product.name}</strong>
                    <span>{product.formattedPrice}</span>
                  </div>

                  <button onClick={() => addItemToCart(product)}>
                    <Handbag size={32} weight="bold" />
                  </button>
                  
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
    
  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price
    
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount,
      formattedPrice: new Intl.NumberFormat('DE', {
        style: 'currency',
        currency: 'eur',
      }).format(price.unit_amount / 100),
      defaultPriceId: price.id,
    }
  })
  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}
