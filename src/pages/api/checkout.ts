import { NextApiRequest, NextApiResponse } from "next"
import { Product } from "use-shopping-cart/core"
import { stripe } from "../../lib/stripe"

// interface FormattedData {
//     id: string
//     name: string
//     //description: string
//     image: string
//     formattedPrice: number
//     unit_amount: number
//     quantity: number
//     priceId: string
//     //currency: string
//   }
  
  export default async function checkout(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    const { products } = req.body as { products: Product[] };
      
    if (req.method !== 'POST') {
      // Por padrão o next deixa as rotas serem acessadas com qualquer método
      return res.status(405).json({ error: 'Method not allowed.' })
    }
  
    // if (!formattedData) {
    //   // Caso a rota seja acessada sem priceId
    //   return res.status(400).json({ error: 'Details not found.' })
    // }
  
    // const lineItems = formattedData.map((item: FormattedData) => {
    //   return {
    //       quantity: item.quantity,
    //       price: item.priceId,
    //     }
    // })
  
    const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${process.env.NEXT_URL}/`;

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'payment', // Modo de pagamento
      success_url: successUrl,
      cancel_url: cancelUrl,
      line_items:  products.map((product) => ({
        price: product.price_id,
        quantity: 1,
      })),
    });

    //console.log(checkoutSession)
  
  //201 indica que algo foi criado - checkout session
    return res.status(201).json({ 
      checkoutUrl: checkoutSession.url,
    })
  }