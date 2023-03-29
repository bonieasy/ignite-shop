import * as Dialog from '@radix-ui/react-dialog';
import { Content, ImageContainer, Overlay, Products } from '../styles/components/bagProducts';
import Image from "next/image";
import camisa from '../assets/4.png';


export default function BagModal () {
    return(
        <Dialog.Portal>
            <Overlay />

            <Content>
              
              <Dialog.Title>Sacola de compras</Dialog.Title>
                <Products>
                  <ImageContainer>
                    <Image src={camisa} width={93} height={80} alt="" />
                  </ImageContainer>
                  <div>
                    <span>Camiseta Beyond the Limits</span>
                    <strong>R$ 79,90</strong>
                    <button>Remover</button>
                  </div>
                </Products>

                <footer>
                  <div>
                    <span>Quantidade</span>
                    <span>3 itens</span>
                  </div>
                  <div>
                    <strong>Valor total</strong>
                    <strong>R$ 270,00</strong>
                  </div>
                  <button>Finalizar compra</button>
                </footer>



              <Dialog.Close />

            </Content>
          </Dialog.Portal>
    );
}