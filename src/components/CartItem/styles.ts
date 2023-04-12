import { styled } from '../../styles'

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