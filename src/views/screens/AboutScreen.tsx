import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setScreen } from "../../data/redux/global.reducer";
import Page from "../components/Page";
import Text from "../components/Text";
import View from "../components/View";
import PhotoComponent from "../components/PhotoComponent";
import photos from "../../data/constants/photos";
import constants from "../../data/constants/constants";
import colors from "../../data/constants/colors";

const DOCUMENT_TITLE = 'About | Ethan McIntyre';
const ABOUT = "Hey! I'm Ethan and I'm a developer with a passion for creating and building things. I'm a junior studying Computer Science and Business at the University of Michigan. I have experience in full-stack web development and mobile app development. I'm always looking for new opportunities to learn and grow as a developer. I'm currently working as a developer for Streetmeet Inc. In my free time, I enjoy skydiving, ballroom dancing, and playing guitar.";
const MAX_CONTAINER_WIDTH = '1000px';
const IMAGE_GAP = '1rem';
const MAX_PHOTO_WIDTH = '450px';
const PHOTO_WIDTH = '45%';

export default function AboutScreen() {
    const dispatch = useDispatch();
    useEffect(() => {
        document.title = DOCUMENT_TITLE;
        dispatch(setScreen('AboutScreen'));
    }, [dispatch]);

    return (
        <Page style={{
            paddingTop: constants.HEADER_HEIGHT,
            paddingBottom: constants.DEFAULT_PADDING,
            alignItems: 'center',
            scrollbarWidth: 'auto',
        }}>
            <View style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                alignItems: 'center',
                boxSizing: 'border-box',
            }}>
                <Text style={{
                    fontSize: constants.HEADER_FONT_SIZE,
                    fontWeight: 'bold',
                    color: colors.offWhite,
                    borderBottom: constants.BORDER,
                    borderTop: constants.BORDER,
                    width: '100%',
                    textAlign: 'center',
                }}>
                    ABOUT
                </Text>

                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    width: '100%',
                    maxWidth: MAX_CONTAINER_WIDTH,
                    justifyContent: 'space-around',
                    gap: IMAGE_GAP, 
                    boxSizing: 'border-box',
                    padding: constants.POST_TEXT_PADDING,
                }}>
                    <PhotoComponent
                        photo={photos.view1}
                        style={{
                            width: PHOTO_WIDTH,
                            maxWidth: MAX_PHOTO_WIDTH,
                            height: 'auto',
                        }}
                    />

                    <PhotoComponent
                        photo={photos.view2}
                        style={{
                            width: PHOTO_WIDTH,
                            maxWidth: MAX_PHOTO_WIDTH,
                            height: 'auto',
                        }}
                    />
                </View>

                <Text style={{
                    fontSize: constants.TEXT_FONT_SIZE,
                    color: colors.offWhite,
                    lineHeight: constants.TEXT_LINE_HEIGHT,
                    fontWeight: 'normal',
                    maxWidth: MAX_CONTAINER_WIDTH,
                    boxSizing: 'border-box',
                    padding:  constants.POST_TEXT_PADDING,
                    paddingTop: '0px',
                }}>
                    {ABOUT}
                </Text>
            </View>
        </Page>
    );
}
