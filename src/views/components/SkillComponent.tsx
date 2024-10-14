import styles from "../../lib/styles";
import PhotoComponent from "./PhotoComponent";
import View from "./View";
import Text from "./Text";
import constants from "../../lib/constants";
import { useAppSelector } from "../../redux/hooks";

interface SkillComponentProps {
    name: string;
    photo: string;
    description: string;
}

const PHOTO_WIDTH = 100;
const MAX_PHOTO_WIDTH = '100%';
const MAX_CONTAINER_WIDTH = 800;
const MAX_TEXT_WIDTH = 200;

const MOBILE_PHOTO_WIDTH = 50;
const MOBILE_TEXT_WIDTH = 75;

export default function SkillComponent({ name, photo, description }: SkillComponentProps) {
    const { width } = useAppSelector(state => state.global);

    return (
        <View style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: MAX_CONTAINER_WIDTH,
            boxSizing: 'border-box',
            padding: constants.POST_TEXT_PADDING,
            borderRadius: constants.BORDER_RADIUS * 2,
            backgroundColor: constants.RANDOM_COLOR(),
            boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
            justifyContent: 'space-around',
        }}>
            <PhotoComponent
                photo={photo}
                style={{
                    width: width < constants.MOBILE_THRESHOLD ? MOBILE_PHOTO_WIDTH : PHOTO_WIDTH,
                    maxWidth: MAX_PHOTO_WIDTH,
                    height: 'auto',
                }}
            />
            <Text style={{
                fontSize: width < constants.MOBILE_THRESHOLD ? '16px' : constants.TITLE_FONT_SIZE,
                fontWeight: 'bold',
                textAlign: 'center',
                marginTop: constants.DEFAULT_PADDING,
                borderTop: 'solid 1px black',
                borderBottom: 'solid 1px black',
                width: '100%',
                maxWidth: width < constants.MOBILE_THRESHOLD ? MOBILE_TEXT_WIDTH : MAX_TEXT_WIDTH,
            }}>
                {name}
            </Text>
            <Text style={{
                fontSize: width < constants.MOBILE_THRESHOLD ? '10px' : constants.TEXT_FONT_SIZE,
                textAlign: 'center',
                marginTop: constants.DEFAULT_PADDING,
                maxWidth: width < constants.MOBILE_THRESHOLD ? MOBILE_TEXT_WIDTH : MAX_TEXT_WIDTH,
            }}>
                {description}
            </Text>
        </View>
    );
}