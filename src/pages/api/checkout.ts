import { NextApiRequest, NextApiResponse } from "next"
import { Product } from "use-shopping-cart/core"
import { stripe } from "../../lib/stripe"
  
  export default async function checkout(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    const { products } = req.body as { products: Product[] };
      
    if (req.method !== 'POST') {
      // Por padrão o next deixa as rotas serem acessadas com qualquer método
      return res.status(405).json({ error: 'Method not allowed.' })
    }
  
    const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${process.env.NEXT_URL}/`;

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'payment', // Modo de pagamento
      success_url: successUrl,
      cancel_url: cancelUrl,
      line_items:  products.map((product) => ({
        price: product.price_id,
        quantity: 1,
        price_data: {
          currency: 'eur',
          unit_amount: product.price,
          product_data: {
            name: product.name,
            description: product.description,
            images: [product.image],
          }
        }
      })),
    });
  
  //201 indica que algo foi criado - checkout session
    return res.status(201).json({ 
      checkoutUrl: checkoutSession.url,
    })
  }