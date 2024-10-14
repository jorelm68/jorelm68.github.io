import { Blank, GlobalReducer, Post, Res } from "./types";

const NUMBERS = '10.0.0.82';
const PORT = 4000;

const EARTHY_COLORS = [
    '#8B4513',  // SaddleBrown (wood, earthy brown)
    '#A0522D',  // Sienna (brownish)
    '#6B8E23',  // OliveDrab (green, natural)
    '#556B2F',  // DarkOliveGreen (green, muted)
    '#8FBC8F',  // DarkSeaGreen (soft, earthy green)
    '#DEB887',  // BurlyWood (light brown)
    '#D2B48C',  // Tan (warm, natural)
    '#C0C0C0',  // Silver (for stone-like accents)
    '#BDB76B',  // DarkKhaki (faded yellow-green)
    '#CD853F',  // Peru (earthy brown)
    '#BC8F8F',  // RosyBrown (warm, muted red-brown)
    '#4682B4',  // SteelBlue (for a subtle sky or cool tone)
    '#808000',  // Olive (classic, earthy green)
];

const STATUE_COLORS = [
    '#F0EDE7',
    '#DCD3C9',
    '#70644C',
    '#D9D4D4',
    '#9B968E',
]

const SKIN_TONES = [
    '#f4e8d9',
    '#eadac3',
    '#d6c0a8',
    '#c3ab93',
    '#b29b84',
]

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
    NO_BACKDROP: [''],

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

    RESUME_NAME: 'McIntyre_Ethan_Resume.pdf',
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
        In my free time, I enjoy 
        <a href="https://jorelm68.github.io/#/post/Post-66bbd5e30058fb3a79573c75">skydiving</a>, 
        <a href="https://jorelm68.github.io/#/post/Post-66bbd12a0058fb3a79573c47">ballroom dancing</a>, and 
        playing guitar.`
    ),

    RANDOM_COLOR: () => {
        return `rgba(${255 - (Math.random() * 100) % 50}, ${255 - (Math.random() * 100) % 50}, ${255 - (Math.random() * 100) % 50}, 1)`;
    },

    EARTHY_COLOR: () => {
        const randomIndex = Math.floor(Math.random() * EARTHY_COLORS.length);
        return EARTHY_COLORS[randomIndex];
    },

    STATUE_COLOR: () => {
        const randomIndex = Math.floor(Math.random() * STATUE_COLORS.length);
        return STATUE_COLORS[randomIndex];
    },

    SKIN_TONE: () => {
        const randomIndex = Math.floor(Math.random() * SKIN_TONES.length);
        return SKIN_TONES[randomIndex];
    },

    SKILLS: [
        {
            name: 'React',
            photo: 'https://static-00.iconduck.com/assets.00/react-original-wordmark-icon-840x1024-vhmauxp6.png',
            description: 'JavaScript library for building user interfaces.',
        },
        {
            name: 'React Native',
            photo: 'https://devtop.io/wp-content/uploads/2022/10/react-native-1.png',
            description: 'JavaScript framework for building mobile applications.',
        },
        {
            name: 'Node.js',
            photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Node.js_logo_2015.svg/2560px-Node.js_logo_2015.svg.png',
            description: 'JavaScript runtime built on Chrome V8 engine.',
        },
        {
            name: 'Express.js',
            photo: 'https://images.credly.com/images/1c2c86e1-16ce-4e4d-a425-d1ac96bb026d/express.png',
            description: 'Fast, unopinionated, minimalist web framework for Node.js.',
        },
        {
            name: 'MongoDB',
            photo: 'https://i0.wp.com/ahex.co/wp-content/uploads/2022/06/mongodb-logo.png?fit=413%2C484&ssl=1',
            description: 'Document-oriented NoSQL database program.',
        },
        {
            name: 'Firebase',
            photo: 'https://cdn.iconscout.com/icon/free/png-256/free-firebase-1-282796.png?f=webp&w=256',
            description: 'Platform developed by Google for creating mobile and web applications.',
        },
        {
            name: 'C++',
            photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1822px-ISO_C%2B%2B_Logo.svg.png',
            description: 'General-purpose programming language.',
        },
        {
            name: 'C',
            photo: 'https://upload.wikimedia.org/wikipedia/commons/1/19/C_Logo.png',
            description: 'General-purpose programming language.',
        },
        {
            name: 'Python',
            photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1869px-Python-logo-notext.svg.png',
            description: 'High-level programming language.',
        },
        {
            name: 'Java',
            photo: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Java_programming_language_logo.svg/1200px-Java_programming_language_logo.svg.png',
            description: 'Object-oriented programming language.',
        },
        {
            name: 'ARM Assembly',
            photo: 'https://assets.labs.ine.com/web/badges/low/arm-assembly.png',
            description: 'Low-level programming language.',
        },
        {
            name: 'Flask',
            photo: 'https://cdn.icon-icons.com/icons2/2389/PNG/512/flask_logo_icon_145276.png',
            description: 'Micro web framework written in Python.',
        },
        {
            name: 'React PDF',
            photo: 'https://react-pdf.org/images/logo.png',
            description: 'React library for creating PDF files.',
        },
        {
            name: 'React Beautiful DnD',
            photo: 'https://user-images.githubusercontent.com/2182637/53611918-54c1ff80-3c24-11e9-9917-66ac3cef513d.png',
            description: 'React library for drag and drop functionality.',
        },
        {
            name: 'Sharp',
            photo: 'https://cdn.jsdelivr.net/gh/lovell/sharp@main/docs/image/sharp-logo-600.png',
            description: 'High performance Node.js image processing module.',
        },
        {
            name: 'Mongoose',
            photo: 'https://media.licdn.com/dms/image/D4D12AQEk8opKsyHhRQ/article-cover_image-shrink_720_1280/0/1693917399837?e=2147483647&v=beta&t=6LPN-E9p8k_59NMv17edpwj8ofRzcXd_vlmlFoc1fLw',
            description: 'Elegant MongoDB object modeling for Node.js.',
        },
        {
            name: 'Axios',
            photo: 'https://user-images.githubusercontent.com/8939680/57233884-20344080-6fe5-11e9-8df3-0df1282e1574.png',
            description: 'Promise based HTTP client for the browser and Node.js.',
        },
        {
            name: 'React Redux',
            photo: 'https://raw.githubusercontent.com/reduxjs/redux/master/logo/logo.png',
            description: 'Predictable state container for JavaScript apps.',
        },
        {
            name: 'React Router',
            photo: 'https://static-00.iconduck.com/assets.00/react-router-icon-2048x1116-jfeevj0l.png',
            description: 'Declarative routing for React.',
        },
        {
            name: 'React Context',
            photo: 'https://miro.medium.com/v2/resize:fit:1400/1*hNRK_zr3qrTORJXD3pwuZA.png',
            description: 'React library for managing global state.',
        },
        {
            name: 'HTML',
            photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/512px-HTML5_logo_and_wordmark.svg.png',
            description: 'Standard markup language for documents designed to be displayed in a web browser.',
        },
        {
            name: 'CSS',
            photo: 'https://1000logos.net/wp-content/uploads/2020/09/CSS-Logo.png',
            description: 'Style sheet language used for describing the presentation of a document written in a markup language.',
        },
        {
            name: 'Figma',
            photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Figma-logo.svg/1667px-Figma-logo.svg.png',
            description: 'Vector graphics editor and prototyping tool.',
        },
        {
            name: 'JavaScript',
            photo: 'https://i.pinimg.com/originals/13/40/7c/13407c12f50f08d328800c3caef43f61.png',
            description: 'High-level, interpreted programming language.',
        },
        {
            name: 'TypeScript',
            photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/2048px-Typescript_logo_2020.svg.png',
            description: 'Strict syntactical superset of JavaScript.',
        },
        {
            name: 'Heroku',
            photo: 'https://cdn.icon-icons.com/icons2/2699/PNG/512/heroku_logo_icon_168126.png',
            description: 'Cloud platform as a service supporting several programming languages.',
        },
        {
            name: 'Git',
            photo: 'https://static-00.iconduck.com/assets.00/git-icon-2048x2048-juzdf1l5.png',
            description: 'Distributed version control system.'
        },
        {
            name: 'GitHub',
            photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/600px-Octicons-mark-github.svg.png',
            description: 'Web-based version control system.'
        },
        {
            name: 'Vercel',
            photo: 'https://cdn.worldvectorlogo.com/logos/vercel.svg',
            description: 'Cloud platform for static sites and serverless functions.',
        },
        {
            name: 'Expo Router',
            photo: 'https://expo.github.io/router/img/logo.light.svg',
            description: 'React Native framework for defining navigation in mobile applications.',
        },
        {
            name: 'EAS',
            photo: 'https://cdn.icon-icons.com/icons2/2389/PNG/512/expo_logo_icon_145293.png',
            description: 'React Native framework for building and deploying mobile applications to Android and iOS.',
        },
        {
            name: 'Firestore Database',
            photo: 'https://lh3.googleusercontent.com/DeQhTyR14i47oAgzoOSJZbSpPRwjfpAW5NuXkDq4vxqXvRUhq4kZ6KJ-P4PqURTpqMCmBvdhJkjALL32XSWq=w240-h240',
            description: 'Cloud-hosted NoSQL database.',
        },
        {
            name: 'Firebase Security Rules',
            photo: 'https://seeklogo.com/images/F/firestore-logo-3828671CC5-seeklogo.com.png',
            description: 'Firebase service that allows for the creation of security rules to protect data in Firestore.',
        },
        {
            name: 'Firebase Authentication',
            photo: 'https://jorelm68-1dc8eff04a80.herokuapp.com/api/portfolio/photo/readPhoto/Photo-66babfbf0058fb3a795736cf/1080',
            description: 'Firebase service that can authenticate users using only client-side code.',
        },
        {
            name: 'Firebase Storage',
            photo: 'https://firebase.google.com/static/images/products/icons/build_storage.svg',
            description: 'Firebase service that supports uploading and downloading user-generated content.',
        },
        {
            name: 'Stripe',
            photo: 'https://cdn.dribbble.com/users/920/screenshots/3031540/untitled-3.gif',
            description: 'Online payment processing for internet businesses.',
        },
        {
            name: 'Express Validator',
            photo: 'https://images.opencollective.com/express-validator/36a8af1/logo/256.png',
            description: 'Express middleware for input validation.',
        },
        {
            name: 'Amazon S3',
            photo: 'https://miro.medium.com/v2/resize:fit:401/1*ThIofZs6uOtgMsiMP2rWGg.png',
            description: 'Scalable object storage service.',
        },
        {
            name: 'Bootstrap',
            photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bootstrap_logo.svg/1280px-Bootstrap_logo.svg.png',
            description: 'CSS framework for developing responsive and mobile-first websites.',
        },
        {
            name: 'EJS',
            photo: 'https://www.svgrepo.com/show/373574/ejs.svg',
            description: 'Embedded JavaScript templating.',
        },
        {
            name: 'Nodemailer',
            photo: 'https://i0.wp.com/community.nodemailer.com/wp-content/uploads/2015/10/n2-2.png?fit=422%2C360&ssl=1',
            description: 'Module for Node.js applications to allow easy email sending.',
        },
        {
            name: 'Bcrypt',
            photo: 'https://cdn.prod.website-files.com/633ecd318496f5ccb3678555/633ecd318496f56a9c67872f_Copy%20of%20Copy%20of%20Untitled%20(5).svg',
            description: 'Password hashing function.',
        },
        {
            name: 'Expo Notifications',
            photo: 'https://cdn.icon-icons.com/icons2/2389/PNG/512/expo_logo_icon_145293.png',
            description: 'React Native framework for sending push notifications.',
        },
        {
            name: 'Framer Motion',
            photo: 'https://www.ejable.com/wp-content/uploads/2022/04/Framer-Motion.webp',
            description: 'React library for creating animations.',
        },
        {
            name: 'Next.js',
            photo: 'https://cdn.worldvectorlogo.com/logos/next-js.svg',
            description: 'React framework for building server-side rendered applications.',
        },
        {
            name: 'TestFlight',
            photo: 'https://cdn.jim-nielsen.com/macos/512/testflight-2023-05-19.png?rf=1024',
            description: 'Beta testing service for iOS applications.',
        },
        {
            name: 'Google Play Console',
            photo: 'https://developer.android.com/static/distribute/console/images/play-console-blue.png',
            description: 'Developer console for publishing Android applications.',
        },
        {
            name: 'Mapbox',
            photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Mapbox_logo_2019.svg/1200px-Mapbox_logo_2019.svg.png',
            description: 'Location data platform for mobile and web applications.',
        }
    ]
};

// <a href="https://jorelm68.github.io/#/post/Post-66bbd69f0058fb3a79573c78">playing guitar</a>.

export default constants;