import { EMPTY_POST } from "../../lib/constants/empty";
import PhotoComponent from "./PhotoComponent";
import View from "./View";
import Text from "./Text";
import { useAppSelector } from "../../lib/redux/hooks";
import constants from "../../lib/constants/constants";
import styles from "../../lib/constants/styles";

interface PostRawComponentProps {
    name: string;
    description: string;
    url: string;
    color: string;
    backgroundColor: string;
}

export default function PostRawComponent({
    name,
    description,
    url,
    color,
    backgroundColor,
}: PostRawComponentProps) {
    const { width } = useAppSelector(state => state.global);
    const conditionalBorder = (width < constants.MOBILE_THRESHOLD) || (width < constants.WEB_VERTICAL_POST_MAX && width >= constants.WEB_VERTICAL_POST_MIN) ? {
        borderTop: `1px solid ${color ? color : EMPTY_POST.color}`,
    } : {
        borderLeft: `1px solid ${color ? color : EMPTY_POST.color}`,
    }

    return (
        <View
            style={{
                ...styles.reset,
                display: 'flex',
                flexDirection: (width < constants.MOBILE_THRESHOLD) || (width < constants.WEB_VERTICAL_POST_MAX && width >= constants.WEB_VERTICAL_POST_MIN) ? 'column' : 'row',
                width: '100%',
                backgroundColor: backgroundColor ? backgroundColor : EMPTY_POST.backgroundColor,
                color: color,
                borderRadius: constants.BORDER_RADIUS,
                boxSizing: 'border-box',
                maxWidth: constants.MAX_POST_WIDTH,
                alignItems: 'center',
                border: `1px solid ${color ? color : EMPTY_POST.color}`,
            }}
        >
            <View
                style={{
                    flex: '1 1 40%',
                    height: 'auto',
                    overflow: 'hidden',
                    minWidth: url.includes('api/photo/readPhoto') ? constants.MIN_PHOTO_WIDTH : constants.MAX_MEDIA_WIDTH,
                    maxWidth: constants.MAX_MEDIA_WIDTH,
                }}
            >
                {url && url.includes('youtube') ? (
                    <iframe
                        style={{
                            width: '100%',
                            height: 'auto',
                        }}
                        src={url}
                        title={`YouTube Video`}
                        frameBorder="0"
                        allow={constants.VIDEO_ALLOW}
                        allowFullScreen
                    />
                ) : (
                    <PhotoComponent
                        photo={url}
                        resolution={1080}
                        style={{
                            width: '100%',
                            height: 'auto',
                        }}
                    />
                )}
            </View>

            <View
                style={{
                    flex: '1 1 60%',
                    overflow: 'hidden',
                    padding: constants.POST_TEXT_PADDING,
                    ...conditionalBorder,
                }}
            >
                {name && (
                    <Text
                        style={{
                            fontSize: constants.TITLE_FONT_SIZE,
                            fontWeight: 'bold',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            textAlign: 'center',
                            color: color ? color : EMPTY_POST.color,
                        }}
                    >
                        {name}
                    </Text>
                )}

                {description && (
                    <p dangerouslySetInnerHTML={{ __html: description }} style={{
                        fontSize: constants.TEXT_FONT_SIZE,
                        overflow: 'hidden',
                        color: color ? color : EMPTY_POST.color,
                        lineHeight: constants.TEXT_LINE_HEIGHT,
                        fontFamily: constants.FONT,
                    }} />
                )}
            </View>
        </View>
    );
}
