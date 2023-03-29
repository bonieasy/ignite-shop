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
    gap: '2rem',
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