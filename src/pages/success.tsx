import { GetServerSideProps } from "next";
import Link from "next/link";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import { ImageContainer, ImagesCircle, SuccessContainer } from "../styles/pages/success";
import Image from "next/image";
import Head from "next/head";
import { useShoppingCart } from "use-shopping-cart";
import { useEffect } from "react";

interface SuccessProps {
    customerName: string;
    totalAmount: number;
    img: string[];
}

export default function Success({ customerName, totalAmount, img  }:SuccessProps) {
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
                <ImagesCircle>
                    {img.map((image, index) => {
                        return (
                            <ImageContainer key={index}>
                                <Image src={image[0]} width={120} height={110} alt="" />
                            </ImageContainer>               
                        )
                    })}   
                </ImagesCircle>      
                              
                <h1>Purchase done!</h1>

                <p>
                    Uhuul <strong>{customerName}</strong>, your purchase of {totalAmount} items is on its way
                </p>

                <Link href="/">
                    Back to the catalog
                </Link>

            </SuccessContainer>
        </>
    )
}
//
export const getServerSideProps: GetServerSideProps = async ( { query }) => {
    const sessionId = String(query.session_id); // forca o sessionID vir no formato string e nao string[]

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

    const LineItems = session.line_items.data;
    const customerName = session.customer_details.name;
    
    const product = LineItems.map((data) => {
        return (
            data.price.product
        )
    }) as Stripe.Product[]

    const img = product.map(item => {
        return item.images
    })
   
    console.log(img)
    

    var totalAmount = LineItems.reduce(getTotal, 0);

    function getTotal(totalAmount, item) {
        return totalAmount + (item.quantity);
    }

    return {
        props: {
            customerName,
            totalAmount,
            img,
        }
    }
}