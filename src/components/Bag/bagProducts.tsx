import * as Dialog from '@radix-ui/react-dialog';
import { BagDetails, Content, Overlay, PriceDetails, CloseButton } from './styles';
import { X } from '@phosphor-icons/react';
import { CartItem } from '../CartItem/CartItem';
import { useState } from 'react';
import axios from 'axios';
import { useShoppingCart } from 'use-shopping-cart';

// interface FormattedData {
//     id: string;
//     name: string;
//     image: string;
//     priceId: string;
//     quantity: number;
//     formattedPrice: number;
//     price: number;
//     currency: string;
// }

export default function BagModal () {
  const { cartCount, cartDetails, formattedTotalPrice, clearCart } = useShoppingCart()
  const formattedData = [] as any[];

  for (const id in cartDetails) {
    const entry = cartDetails[id];
    formattedData.push(entry)
  }
  const price = formattedData.map((itens) => {
    return itens.price;
  });

  async function handleBuyButton() {
    try {
      const response = await axios.post('/api/checkout', {
        products: formattedData,
      })

      const { checkoutUrl } = response.data
      
      clearCart();

      window.location.href = checkoutUrl
    } catch (err) {
      console.log(err)

      alert('Failed to redirect to checkout!')
      console.log(`oque tem no formattedData: ${JSON.stringify(formattedData)}`)  
      //console.log(checkoutUrl)
    }
  }

  // if (cartDetails !== undefined) {
  //   formattedData = Object.entries(cartDetails).map(([key, value]) => {
  //     return {
  //       id: key,
  //       name: value.name,
  //       image: value.image as string,
  //       formattedPrice: value.formattedPrice,
  //       price: value.price,
  //       priceId: value.price_id,
  //       quantity: value.quantity,
  //       currency: value.currency,
  //     }
  //   })
  // }
  return(
    <Dialog.Portal>
      <Overlay />
        <Content>
          <Dialog.Title>Sacola de compras</Dialog.Title>

          <CloseButton>
            <X size={24} />
          </CloseButton>
            <BagDetails>
              {formattedData.map((item) => {
                return (

                  <CartItem 
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    image={item.image}
                    quantity={item.quantity}
                    formattedPrice={item.formattedPrice}
                    price={item.price}
                  />
                )
              })}              

              <PriceDetails>
                <div>
                  <span>Quantidade</span>
                  <span>{cartCount} itens</span>
                </div>
                <div>
                  <strong>Valor total</strong>
                  <strong>{formattedTotalPrice}</strong>
                </div>
                <button
                  onClick={handleBuyButton}
                >
                  Finalizar compra
                </button>
              </PriceDetails>

            </BagDetails>
        </Content>
      </Dialog.Portal>
  );
}