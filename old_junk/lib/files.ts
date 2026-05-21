import constants from "./constants";

// Static imports
const files: { [key: string]: string } = {
    resume: require(`../assets/files/${constants.RESUME_NAME}`),
    defaultImage: require("../assets/photos/defaultImage.jpg"),
    gear: require("../assets/photos/gear.jpg"),
    gmail: require("../assets/photos/gmail.png"),
    phone: require("../assets/photos/phone.png"),
    linkedIn: require("../assets/photos/linkedIn.png"),
    github: require("../assets/photos/github.png"),
    leetcode: require("../assets/photos/leetcode.png"),
    pdf: require("../assets/photos/pdf.png"),
    me1: require("../assets/photos/me1.png"),
    me2: require("../assets/photos/me2.png"),
    view1: require("../assets/photos/view1.jpg"),
    view2: require("../assets/photos/view2.jpg"),
    initials: require("../assets/photos/initials.png"),
    initialsTransparent: require("../assets/photos/initialsTransparent.png"),
    skydive: require("../assets/photos/skydive.jpg"),
    dance: require("../assets/photos/dance.jpg"),
    businessCard: require("../assets/photos/businessCard.png"),
    headshot: require("../assets/photos/headshot.jpg"),
};

// Add all generic images as static imports
for (let i = 1; i <= 71; i++) {
    const key = `generic${i}`;
    files[key] = require(`../assets/photos/${key}.jpg`);
}

export default files;