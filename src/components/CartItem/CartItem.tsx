import { ImageContainer, ProductDetails, Products } from "./styles";
import Image from "next/image";
import { useShoppingCart } from 'use-shopping-cart'

interface CartItemProps {
    id: string
    name: string
    image: string
    formattedPrice: number
    price: number
    quantity: number
  }

export function CartItem ({ id, name, image, quantity, formattedPrice, price }: CartItemProps) {
    const { removeItem } = useShoppingCart()

    return (
        <Products>

            <ImageContainer>
                <Image src={image} width={93} height={80} alt="" />
            </ImageContainer>

            <ProductDetails>
                <span>{quantity! > 1 && <strong>x{quantity}&nbsp;</strong>}{name}</span>
                <strong>{formattedPrice}</strong>
                <button onClick={() => removeItem(id)}>Remover</button>
            </ProductDetails>
            
        </Products>
    );
}