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

    book1: require("../assets/scrap/book1.jpg"),
    book2: require("../assets/scrap/book2.jpg"),
    book3: require("../assets/scrap/book3.jpg"),
    book4: require("../assets/scrap/book4.jpg"),
    book5: require("../assets/scrap/book5.jpg"),
    book6: require("../assets/scrap/book6.jpg"),
    book7: require("../assets/scrap/book7.jpg"),
    book8: require("../assets/scrap/book8.jpg"),
    book9: require("../assets/scrap/book9.jpg"),
    book10: require("../assets/scrap/book10.jpg"),

    cameraPrograph: require("../assets/scrap/cameraPrograph.jpg"),
    cameraRetrograph: require("../assets/scrap/cameraRetrograph.jpg"),
    libraryScraps: require("../assets/scrap/libraryScraps.jpg"),
    profileBooks: require("../assets/scrap/profileBooks.jpg"),
    profileMap: require("../assets/scrap/profileMap.jpg"),
};

// Add all generic images as static imports
for (let i = 1; i <= 71; i++) {
    const key = `generic${i}`;
    files[key] = require(`../assets/photos/${key}.jpg`);
}

export default files;