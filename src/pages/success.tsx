import { GetServerSideProps } from "next";
import Link from "next/link";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import { ImageContainer, SuccessContainer } from "../styles/pages/success";
import Image from "next/image";
import Head from "next/head";
import { useShoppingCart } from "use-shopping-cart";
import { useEffect } from "react";

interface SuccessProps {
    customerName: string;
    product: {
      name: string;
      imageUrl: string;
    }
  }

export default function Success({ customerName, product  }:SuccessProps) {
    const { clearCart, cartDetails } = useShoppingCart()
        useEffect(() => {
        if (cartDetails !== undefined && Object.keys(cartDetails).length !== 0) {
            clearCart()
        }
        }, [clearCart, cartDetails])

    return(
        <>
            <Head>
            <title>Purchase done | Ignite Shop</title>
            <meta name="robots" content="noindex" ></meta>
            </Head>

            <SuccessContainer>
                <h1>Purchase done!</h1>

                <ImageContainer>
                    <Image src={product.imageUrl} width={120} height={110} alt="" />
                </ImageContainer>

                <p>
                    Uhuul <strong>{customerName}</strong>, sua compra de <strong>{product.name}</strong> ja esta a caminho
                </p>

                <Link href="/">
                    Back to the catalog
                </Link>

            </SuccessContainer>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ( { query }) => {
    const sessionId = String(query.session_id);

    if (!query.session_id) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items', 'line_items.data.price.product']
    })

    const customerName = session.customer_details.name;
    const product = session.line_items.data[0].price.product as Stripe.Product

    return {
        props: {
            customerName,
            product: {
                name: product.name,
                imageUrl: product.images[0],
            }
        }
    }
}