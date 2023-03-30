import { styled } from "..";
import * as Dialog from '@radix-ui/react-dialog';


export const Overlay = styled(Dialog.Overlay, {
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.75)',
})

export const Content = styled(Dialog.Content, {
    padding: '3rem',
    background: '$gray800',
    position: 'fixed',
    minHeight: '100vh',
    minWidth: '33%',
    top: '0%',
    left: '75%',
    //transform: 'translate(-50%, -50%)',

    display: 'flex',
    flexDirection: 'column',
    //justifyContent: 'space-between',
    gap: '2rem',
})

export const BagDetails = styled('div', {
    //minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    
})

export const Products = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    gap: '1rem',
})

export const ImageContainer = styled('div', {
    width: '6.371rem',
    height: '5.813rem',
    background: 'linear-gradient(188deg, #1EA483 0%, #7465D4 100%)',
    borderRadius: 8,
    padding: '0.25rem',
})

export const ProductDetails = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '0.5rem',
    lineHeight: '160%',

    span: {
        fontWeight: 400,
        fontSize: 18,
    },

    strong: {
        fontWeight: 700,
        fontSize: 18,
    },

    button: {
        background: 'transparent',
        border: 0,
        color: '$green500',
        fontWeight: 700,
        fontSize: 16,
        lineHeight: '160%',
    },

})

export const PriceDetails = styled('footer', {
    button: {
        background: '$green300',
        border: 0,
        color: '$white',
        padding: '1.25rem 2rem',
        borderRadius: 8,
        fontWeight: 700,
        fontSize: 18,
        lineHeight: '160%',
        //width: '70%',
    }
})

export const CloseButton = styled(Dialog.Close, {
    position: 'absolute',
    background: 'transparent',
    border: 0,
    //top: '1rem',
    //right: '0.1rem',
    verticalAlign: 'top',
    marginLeft: '8rem',
    //marginBottom: 600,
    lineHeight: 0,
    cursor: 'pointer',
    color: '$white',
})