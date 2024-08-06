export default {
    absolute: {
        position: 'absolute' as const,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },

    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    reset: {
        margin: '0px',
        padding: '0px',
        border: 'none',
        outline: 'none',
        background: 'none',
        fontFamily: 'inherit',
        fontSize: 'inherit',
        color: 'inherit',
        textDecoration: 'none',
    }
}