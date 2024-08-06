import constants from "./constants";

const files: { [key: string]: string } = {
    resume: require(`${constants.FILES_ROUTE}/${constants.RESUME_NAME}`),
    defaultImage: require(`${constants.PHOTOS_ROUTE}/default.jpg`),
    gear: require(`${constants.PHOTOS_ROUTE}/gear.jpg`),
    gmail: require(`${constants.PHOTOS_ROUTE}/gmail.png`),
    phone: require(`${constants.PHOTOS_ROUTE}/phone.png`),
    linkedIn: require(`${constants.PHOTOS_ROUTE}/linkedIn.png`),
    github: require(`${constants.PHOTOS_ROUTE}/github.png`),
    leetcode: require(`${constants.PHOTOS_ROUTE}/leetcode.png`),
    pdf: require(`${constants.PHOTOS_ROUTE}/pdf.png`),
    me1: require(`${constants.PHOTOS_ROUTE}/me1.png`),
    me2: require(`${constants.PHOTOS_ROUTE}/me2.png`),
    view1: require(`${constants.PHOTOS_ROUTE}/view1.jpg`),
    view2: require(`${constants.PHOTOS_ROUTE}/view2.jpg`),
    initials: require(`${constants.PHOTOS_ROUTE}/initials.png`),
    initialsTransparent: require(`${constants.PHOTOS_ROUTE}/initialsTransparent.png`),
    skydive: require(`${constants.PHOTOS_ROUTE}/skydive.jpg`),
    dance: require(`${constants.PHOTOS_ROUTE}/dance.jpg`),
    businessCard: require(`${constants.PHOTOS_ROUTE}/businessCard.png`),
    headshot: require(`${constants.PHOTOS_ROUTE}/headshot.jpg`),
};

for (let i = 1; i <= 71; i++) {
    const key = `generic${i}`;
    files[key] = require(`${constants.PHOTOS_ROUTE}/${key}.jpg`);
}

export default files;
