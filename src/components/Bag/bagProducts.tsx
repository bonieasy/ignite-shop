import * as Dialog from '@radix-ui/react-dialog';
import { BagDetails, Content, Overlay, PriceDetails, CloseButton } from './styles';
import { X } from '@phosphor-icons/react';
import { CartItem } from '../CartItem/CartItem';
import { useState } from 'react';
import axios from 'axios';

interface FormattedData {
  id: string
  name: string
  image: string
  formattedPrice: string
  quantity: number
  priceId: string
}

export default function BagModal () {
  let formattedData: FormattedData[] = []
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

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
                    formattedPrice={item.formattedPrice}
                  />
                )
              })}              

              <PriceDetails>
                <div>
                  <span>Quantidade</span>
                  <span>3 itens</span>
                </div>
                <div>
                  <strong>Valor total</strong>
                  <strong>R$ 270,00</strong>
                </div>
                <button>Finalizar compra</button>
              </PriceDetails>

            </BagDetails>
        </Content>
      </Dialog.Portal>
  );
}