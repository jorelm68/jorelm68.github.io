export const NAME = "Ethan McIntyre";
export const EMAIL = "methan@umich.edu";
export const LINKEDIN = "https://www.linkedin.com/in/ethan-mcintyre68/";
export const GITHUB = "https://github.com/jorelm68";
export const DNEP = "https://detroitsmallbusiness.umich.edu/";
export const WEBSITE = "https://jorelm68.github.io/";
export const DESCRIPTION = "Ethan McIntyre: accounting, bookkeeping, Airtable development and small business consulting with the Detroit Neighborhood Entrepreneurs Project (DNEP).";
export const KEYWORDS = [
    `${NAME}`, 
    "Detroit Neighborhood Entrepreneurs Project", 
    "DNEP", 
    "Airtable", 
    "Accounting", 
    "Ballroom Dance", 
    "Guitar", 
    "Accounting Consultant",
    "Business Consultant",
    "Data Automation"
]

export const BACKGROUND_IMAGES = [
    '/generic1.jpg',
    '/generic2.jpg',
    '/generic3.jpg',
    '/generic4.jpg',
    '/generic5.jpg',
    '/generic6.jpg',
    '/generic7.jpg',
    '/generic8.jpg',
    '/generic9.jpg',
    '/generic10.jpg',
    '/generic11.jpg',
    '/generic12.jpg',
    '/generic13.jpg',
    '/generic14.jpg',
    '/generic15.jpg',
    '/generic16.jpg',
    '/generic17.jpg',
    '/generic18.jpg',
    '/generic19.jpg',
    '/generic20.jpg',
    '/generic21.jpg',
    '/generic22.jpg',
    '/generic23.jpg',
    '/generic24.jpg',
    '/generic25.jpg',
    '/generic26.jpg',
    '/generic27.jpg',
    '/generic28.jpg',
    '/generic29.jpg',
    '/generic30.jpg',
    '/generic31.jpg',
    '/generic32.jpg',
    '/generic33.jpg',
    '/generic34.jpg',
    '/generic35.jpg',
    '/generic36.jpg',
    '/generic37.jpg',
    '/generic38.jpg',
    '/generic39.jpg',
    '/generic40.jpg',
    '/generic41.jpg',
    '/generic42.jpg',
    '/generic43.jpg',
    '/generic44.jpg',
    '/generic45.jpg',
    '/generic46.jpg',
    '/generic47.jpg',
    '/generic48.jpg',
    '/generic49.jpg',
    '/generic50.jpg',
    '/generic51.jpg',
    '/generic52.jpg',
    '/generic53.jpg',
    '/generic54.jpg',
    '/generic55.jpg',
    '/generic56.jpg',
    '/generic57.jpg',
    '/generic58.jpg',
    '/generic59.jpg',
    '/generic60.jpg',
    '/generic61.jpg',
    '/generic62.jpg',
    '/generic63.jpg',
    '/generic64.jpg',
    '/generic65.jpg',
    '/generic66.jpg',
    '/generic67.jpg',
    '/generic68.jpg',
    '/generic69.jpg',
    '/generic70.jpg',
    '/generic71.jpg',
    
];
export type Project = {
    name: string;
    url: string;
    image: string;
    description: string;
    // "invite-only": the landing page is public, but sign-in is limited to invited emails.
    access?: "invite-only";
};

export const PROJECTS: Project[] = [
    {
        name: "Tax Conversion Planner",
        url: "https://tax-conversion-planner.vercel.app/",
        image: "/projects/tax.png",
        description: "Finds the Traditional-to-Roth IRA conversion schedule that maximizes after-tax wealth. Runs entirely in the browser.",
    },
    {
        name: "Parline",
        url: "https://www.parline.app/",
        image: "/projects/parline.png",
        description: "Real double-entry books and financial statements for small business owners, keeping business and personal finances apart.",
    },
    {
        name: "Baker’s Acres",
        url: "https://www.bakersacresdexter.com/",
        image: "/projects/bakers.jpg",
        description: "A website for a farm just outside Dexter, Michigan, where customers order fresh produce and eggs delivered to their door.",
    },
    {
        name: "DNEP Detroit",
        url: "https://dnep-detroit.vercel.app/",
        image: "/projects/dnep.png",
        description: "A site for the Detroit Neighborhood Entrepreneurs Project, offering free accounting and tech consulting to Detroit small businesses.",
    },
    {
        name: "Outreach Community Services",
        url: "https://outreach-community-services.jorelm68.workers.dev/",
        image: "/projects/outreach.png",
        description: "A website for a Detroit nonprofit offering door-to-door rides for seniors and people with disabilities, with service pricing and booking.",
    },
    {
        name: "Strawberry Monster",
        url: "https://strawberry-monster.vercel.app/",
        image: "/projects/strawberry-monster.png",
        description: "A stock research lab combining technical indicators, SEC financial statements, automatic Elliott Wave counts and a strategy backtester into a Claude-assisted Buy/Hold/Avoid verdict.",
        access: "invite-only",
    },
    {
        name: "NONOZEMPIC",
        url: "https://nonozempic.vercel.app/",
        image: "/projects/nonozempic.png",
        description: "A private calorie tracker for friends: a daily goal and 7-day chart, quick meal logging with optional AI-assisted calorie estimates, and a Claude connector for logging meals by chat. Prototype.",
        access: "invite-only",
    },
];
