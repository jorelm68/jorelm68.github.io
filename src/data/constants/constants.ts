const constants = {
    NO_BACKDROP: ['AboutScreen'],

    FONT: 'Nunito',

    HEADER_FONT_SIZE: 'clamp(2rem, 8vw, 8rem)',
    TITLE_FONT_SIZE: '1.5em',
    TEXT_FONT_SIZE: '1em',
    NAVBAR_FONT_SIZE: '12px',

    SMALL_BORDER_RADIUS: '5px',
    BORDER_RADIUS: '16px',

    TEXT_LINE_HEIGHT: '1.5em',

    NUM_GENERIC_PHOTOS: 71,

    Z_FAR_BACK: -2,
    Z_BACK: -1,
    Z_MIDDLE: 0,
    Z_FRONT: 1,
    Z_FAR_FRONT: 2,

    ABSOLUTE: {
        position: 'absolute' as const,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
}

export default constants;