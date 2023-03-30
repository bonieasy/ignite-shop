import * as Dialog from '@radix-ui/react-dialog';
import { BagDetails, Content, ImageContainer, Overlay, ProductDetails, Products, PriceDetails, CloseButton } from '../styles/components/bagProducts';
import Image from "next/image";
import camisa from '../assets/4.png';
import { X } from '@phosphor-icons/react';


export default function BagModal () {
  return(
    <Dialog.Portal>
      <Overlay />
        <Content>
        
          <Dialog.Title>Sacola de compras</Dialog.Title>

          <CloseButton>
            <X size={24} />
          </CloseButton>
            <BagDetails>
            
              <Products>

                <ImageContainer>
                  <Image src={camisa} width={93} height={80} alt="" />
                </ImageContainer>

                <ProductDetails>
                  <span>Camiseta Beyond the Limits</span>
                  <strong>R$ 79,90</strong>
                  <button>Remover</button>
                </ProductDetails>
                
              </Products>

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