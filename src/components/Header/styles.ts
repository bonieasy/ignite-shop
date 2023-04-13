import { styled } from '../../styles'

export const HeaderContainer = styled('header', {
    padding: '2rem 0',
    width: '100%',
    maxWidth: 1180,
    margin: '0 auto',

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',

    variants: {
        position: {
          center: {
            justifyContent: 'center',
          },
          spaceBetween: {
            justifyContent: 'space-between',
          },
        },
      },

    '.bag': {
        border: 'none',
        backgroundColor: '$gray800',
        color: '$white',
        borderRadius: 6,
        width: 48,
        height: 48,
        padding: 12,

        display: 'flex',
        alignItems: 'center',
        justifyContent:'center',

    },

    'span': {
        backgroundColor: '$green500',
        border: '3px solid #121214',
        borderRadius: 1000,
        width: 24,
        height: 24,
        position: 'absolute',
        verticalAlign: 'top',
        marginLeft: 40,
        marginBottom: 40,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        fontSize: 14,
        Color: '$white',
    },
})