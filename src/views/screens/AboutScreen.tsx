import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setScreen } from "../../redux/global.reducer";
import Page from "../components/Page";
import Text from "../components/Text";
import View from "../components/View";
import PhotoComponent from "../components/PhotoComponent";
import files from "../../lib/files";
import constants from "../../lib/constants";
import styles from "../../lib/styles";
import SkillComponent from "../components/SkillComponent";
import { Skill } from "../../lib/types";

const DOCUMENT_TITLE = 'About | Ethan McIntyre';
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
                    color: styles.colors.offWhite,
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
                        photo={files.view1}
                        style={{
                            width: PHOTO_WIDTH,
                            maxWidth: MAX_PHOTO_WIDTH,
                            height: 'auto',
                        }}
                    />

                    <PhotoComponent
                        photo={files.view2}
                        style={{
                            width: PHOTO_WIDTH,
                            maxWidth: MAX_PHOTO_WIDTH,
                            height: 'auto',
                        }}
                    />
                </View>

                <Text dangerouslySetInnerHTML={{ __html: constants.ABOUT }} style={{
                    ...styles.reset,
                    fontSize: constants.TEXT_FONT_SIZE,
                    color: 'black',
                    lineHeight: constants.TEXT_LINE_HEIGHT,
                    fontWeight: 'normal',
                    maxWidth: MAX_CONTAINER_WIDTH,
                    boxSizing: 'border-box',
                    padding: constants.POST_TEXT_PADDING,
                    backgroundColor: 'white',
                    borderRadius: constants.BORDER_RADIUS,
                    textAlign: 'center',
                    paddingTop: '8px',
                }} />
            </View>

            <View style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                width: '100%',
                justifyContent: 'space-around',
                boxSizing: 'border-box',
                padding: constants.POST_TEXT_PADDING,
            }}>
                {constants.SKILLS.map((skill, index) => {
                    const { name, photo, description } = skill as Skill;
                    return (
                        <SkillComponent key={index} name={name} photo={photo} description={description} />
                    )
                })}
            </View>
        </Page>
    );
}
