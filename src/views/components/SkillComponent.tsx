import styles from "../../lib/styles";
import PhotoComponent from "./PhotoComponent";
import View from "./View";
import Text from "./Text";
import constants from "../../lib/constants";

interface SkillComponentProps {
    name: string;
    photo: string;
    description: string;
}

const PHOTO_WIDTH = 300;
const MAX_PHOTO_WIDTH = '100%';
const MAX_CONTAINER_WIDTH = 800;

export default function SkillComponent({ name, photo, description }: SkillComponentProps) {
    return (
        <View style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: MAX_CONTAINER_WIDTH,
            boxSizing: 'border-box',
            padding: constants.POST_TEXT_PADDING,
            borderRadius: constants.BORDER_RADIUS,
            backgroundColor: `rgba(${255 - (Math.random() * 100) % 50}, ${255 - (Math.random() * 100) % 50}, ${255 - (Math.random() * 100) % 50}, 1)`,
            boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
        }}>
            <PhotoComponent
                photo={photo}
                style={{
                    width: PHOTO_WIDTH,
                    maxWidth: MAX_PHOTO_WIDTH,
                    height: 'auto',
                }}
            />
            <Text style={{
                fontSize: constants.TITLE_FONT_SIZE,
                fontWeight: 'bold',
                textAlign: 'center',
                marginTop: constants.DEFAULT_PADDING,
                borderTop: 'solid 1px black',
                borderBottom: 'solid 1px black',
            }}>
                {name}
            </Text>
            <Text style={{
                fontSize: constants.TEXT_FONT_SIZE,
                textAlign: 'center',
                marginTop: constants.DEFAULT_PADDING,
            }}>
                {description}
            </Text>
        </View>
    );
}