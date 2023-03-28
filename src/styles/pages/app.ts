import { styled } from "..";

export const Container = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    minHeight: '100vh',
})

export const Header = styled('header', {
    padding: '2rem 0',
    width: '100%',
    maxWidth: 1180,
    margin: '0 auto',

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',

    '.bag': {
        backgroundColor: '$gray800',
        borderRadius: 6,
        width: 48,
        height: 48,
        padding: 12,

        display: 'flex',
        alignItems: 'center',
        justifyContent:'center',

    },

    '.cartCount': {
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