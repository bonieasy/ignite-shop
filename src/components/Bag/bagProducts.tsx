import * as Dialog from '@radix-ui/react-dialog';
import { BagDetails, Content, Overlay, PriceDetails, CloseButton } from './styles';
import { X } from '@phosphor-icons/react';
import { CartItem } from '../CartItem/CartItem';
import { useState } from 'react';
import axios from 'axios';
import { useShoppingCart } from 'use-shopping-cart';

interface FormattedData {
  id: string
  name: string
  image: string
  formattedPrice: number
  quantity: number
  priceId: string
  price: number
}

export default function BagModal () {
  const { cartCount, cartDetails, totalPrice, formattedTotalPrice } = useShoppingCart()
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)
  let formattedData: FormattedData[] = []

  async function handleBuyButton() {
    try {
      setIsCreatingCheckoutSession(true)
      console.log(formattedData)      

      const response = await axios.post('/api/checkout', {
        formattedData,
      })
      
      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (err) {
      setIsCreatingCheckoutSession(false)
      console.log(err)

      alert('Falha ao redirecionar ao checkout!')
    }
  }

  if (cartDetails !== undefined) {
    formattedData = Object.entries(cartDetails).map(([key, value]) => {
      return {
        id: key,
        name: value.name,
        image: value.image as string,
        formattedPrice: value.formattedPrice,
        quantity: value.quantity,
        priceId: value.price_id,
        price: value.price,
      }
    })
  }


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
                    formattedPrice={item.price}
                    quantity={item.quantity}
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
                  disabled={isCreatingCheckoutSession}
                >
                  Finalizar compra
                </button>
              </PriceDetails>

            </BagDetails>
        </Content>
      </Dialog.Portal>
  );
}