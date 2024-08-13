import { Blank, GlobalReducer, Post, Res } from "./types";

const NUMBERS = '10.0.0.82';
const PORT = 4000;

const EMPTY_RES: Res = {
    status: 0,
    success: false,
    data: undefined,
    errorMessage: 'This is the initial response message',
};

const EMPTY_BLANK: Blank = {
    _id: '',
    name: '',
    photo: '',
    description: '',

    createdAt: new Date(),
};

const EMPTY_POST: Post = {
    _id: '',

    name: '',
    description: '',
    selectors: '',
    urls: [],
    captions: [],
    essay: '',
    link: '',
    color: '',
    backgroundColor: 'transparent',
    start: '',
    end: '',
    location: '',

    createdAt: new Date(),
};

const EMPTY_GLOBAL_STATE: GlobalReducer = {
    screen: '',
    width: window.innerWidth,
    isAuthenticated: false,
    showEssay: true,
};

const constants = {
    NO_BACKDROP: ['AboutScreen'],

    FONT: 'Nunito',

    HEADER_FONT_SIZE: 'clamp(24px, 6vw, 72px)',
    TITLE_FONT_SIZE: '1.5em',
    TEXT_FONT_SIZE: 'clamp(1rem, 2.5vw, 1.2rem)',
    NAVBAR_FONT_SIZE: 12,

    SMALL_BORDER_RADIUS: 5,
    BORDER_RADIUS: 16,

    TEXT_LINE_HEIGHT: '1.5em',

    NUM_GENERIC_PHOTOS: 71,

    EMPTY_RES: EMPTY_RES,
    EMPTY_BLANK: EMPTY_BLANK,
    EMPTY_POST: EMPTY_POST,
    EMPTY_GLOBAL_STATE: EMPTY_GLOBAL_STATE,

    Z_FAR_BACK: -2,
    Z_BACK: -1,
    Z_MIDDLE: 0,
    Z_FRONT: 1,
    Z_FAR_FRONT: 2,

    RESUME_NAME: 'Ethan McIntyre.pdf',
    GITHUB_LINK: 'https://www.github.com/jorelm68',
    LINKEDIN_LINK: 'https://www.linkedin.com/in/ethan-mcintyre68',

    HEADER_HEIGHT: 48,
    BOTTOM_ADJUSTMENT: 44,
    DEFAULT_PADDING: 32,

    ME1_SCREEN: 'LandingScreen',
    ME2_SCREEN: 'ContactScreen',
    MY_NAME_SCREEN: 'LandingScreen',

    QUICK_TRANSITION: 0.35,
    SLOW_TRANSITION: 1,

    BORDER: '1px solid white',

    RESOLUTION: 1080,

    WEB_VERTICAL_POST_MIN: 800,
    WEB_VERTICAL_POST_MAX: 1200,
    MOBILE_THRESHOLD: 600,
    MAX_POST_WIDTH: 650,

    MIN_PHOTO_WIDTH: 0,
    MAX_MEDIA_WIDTH: 226,

    POST_TEXT_PADDING: '1rem',
    POST_MEDIA_PADDING: '1rem',

    VIDEO_ALLOW: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',

    BUTTON_PADDING: '10px 20px',
    TEXT_INPUT_PADDING: 10,

    PHOTO_ENDPOINT: 'https://jorelm68-1dc8eff04a80.herokuapp.com/api/photo/readPhoto/',
    YOUTUBE_ENDPOINT: 'https://www.youtube.com/embed/',

    POST_GAP: 16,
    SIDE_GAP: '5%',

    WEBSITE_PREFIXES: ['https://', 'http://'],
    BASE64_PREFIXES: ['data:image/png;base64,', 'data:image/jpeg;base64,', 'data:image/jpg;base64,'],
    FILE_PREFIXES: ['file://'],
    STATIC_PREFIXES: ['/static/media/'],
    PHOTO_PREFIX: 'Photo-',

    PEXELS_API_KEY: 'AapsNavsOWPuyDk2gvRSO027MiXYVuw1p9KQ0a4zWkVzBmtaDgA19Fsm',

    CACHE_CAPACITY: 1000,
    PHOTOS_ROUTE: '../assets/photos',
    FILES_ROUTE: '../assets/files',

    SERVER_URL: 'https://jorelm68-1dc8eff04a80.herokuapp.com',

    LOCAL_URL: `http://${NUMBERS}:${PORT}`,



    ABOUT: (
        `Hey! I'm Ethan and I'm a developer with a passion for creating and building things. 
        I'm a junior studying Computer Science and Business at the University of Michigan. 
        I have experience in full-stack web development and mobile app development. 
        I'm always looking for new opportunities to learn and grow as a developer. 
        I'm currently working as a developer for Streetmeet Inc. 
        In my free time, I enjoy 
        <a href="https://jorelm68.github.io/#/post/Post-66bbd5e30058fb3a79573c75">skydiving</a>, 
        <a href="https://jorelm68.github.io/#/post/Post-66bbd12a0058fb3a79573c47">ballroom dancing</a>, and 
        <a href="https://jorelm68.github.io/#/post/Post-66bbd69f0058fb3a79573c78">playing guitar</a>.`
    )
};

export default constants;