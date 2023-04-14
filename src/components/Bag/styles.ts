import { styled } from '../../styles'
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
    gap: '2rem',
    
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
    top: '1.5rem',
    float: 'right',
    marginLeft: '20rem',
    lineHeight: 0,
    cursor: 'pointer',
    color: '$white',
})