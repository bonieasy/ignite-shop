import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head';
import Image from "next/image";
import { useRouter } from 'next/router';
import Stripe from 'stripe'
import { useShoppingCart } from 'use-shopping-cart';
import { stripe } from '../../lib/stripe'
import { ImageContainer, ProductContainer, ProductsDetails } from '../../styles/pages/product'

interface ProductProps {
    product: {
        id: string;
        name: string;
        imageUrl: string;
        price: number;
        description: string;
        defaultPriceId: string;
        formattedPrice: number;
      }
}

export default function Product({ product }: ProductProps) {
    const { isFallback } = useRouter()
    const { addItem } = useShoppingCart()
 
 function addItemToCart() {
        addItem(
          {
            name: product.name,
            description: product.description,
            id: product.id,
            price: product.price,
            currency: 'eur',
            image: product.imageUrl,
            price_id: product.defaultPriceId,
          },
          { count: 1 },   
        )
    }
    if (isFallback) {
        return <p>Loading...</p>
      }
    
    return(
        <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

        <ProductContainer>
            <ImageContainer>
                <Image src={product.imageUrl} width={520} height={480} alt=""/>
            </ImageContainer>
            <ProductsDetails>
                <h1>{product.name}</h1>
                <span>{product.formattedPrice}</span>

                <p>{product.description}</p>

                <button onClick={addItemToCart}>Add to Basket</button>
            </ProductsDetails>
        </ProductContainer>
        </>                           
    )
}// Esta função gera uma lista de páginas que serão pré-renderizadas no momento da construção.
export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            { params:{ id: 'prod_NZgzcuSxXWizSu' } }
        ],
        fallback: true,
        //fallback: false, quando tentamos accessar a pagina de um produto que nao tem nos paths ele da 404
        //fallback : true, quando acessar e o produto nao foi passado nos paths, ele tentap[egar o id do produto
    }
}
//Gerar pagina estatica para cada produto
export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
    const productId = params!.id; //params -> dentro dele podemos acessar o ID do produto

    const product = await stripe.products.retrieve(productId, {
        expand: ['default_price'], //estamos expandindo o item de preco padrao
    });

    const price = product.default_price as Stripe.Price
    
    return {
        props: {
          product: {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],
                price: price.unit_amount,
                formattedPrice: new Intl.NumberFormat('DE', {
                    style: 'currency',
                    currency: 'eur',
                }).format(price.unit_amount / 100),
                description: product.description,
                defaultPriceId: price.id,
            }
        },
        revalidate: 60 * 60 * 1, //1 hour
    }
}