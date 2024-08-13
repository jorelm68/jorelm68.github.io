import { Link } from "react-router-dom";
import PhotoComponent from "./PhotoComponent";
import View from "./View";
import Text from "./Text";
import { useAppSelector } from "../../redux/hooks";
import constants from "../../lib/constants";
import styles from "../../lib/styles";

interface PostComponentProps {
    color: string,
    backgroundColor: string,
    url: string,
    name: string,
    description: string,
    link?: string,
}

interface LinkWrapperProps {
    link?: string,
    children: React.ReactNode,
}

const LinkWrapper = ({ link, children }: LinkWrapperProps) => {
    return link ? (
        <Link to={link}>
            {children}
        </Link>
    ) : (
        <>{children}</>
    )
}

const PostComponent = ({ color, link, backgroundColor, url, name, description }: PostComponentProps) => {
    const { width } = useAppSelector(state => state.global);

    const conditionalBorder = (width < constants.WEB_VERTICAL_POST_MIN) || (width < constants.WEB_VERTICAL_POST_MAX && width >= constants.WEB_VERTICAL_POST_MIN) ? {
        borderTop: `1px solid ${color}`,
    } : {
        borderLeft: `1px solid ${color}`,
    }

    return (
        <LinkWrapper link={link}>
            <View
                style={{
                    ...styles.reset,
                    display: 'flex',
                    flexDirection: (width < constants.WEB_VERTICAL_POST_MIN) || (width < constants.WEB_VERTICAL_POST_MAX && width >= constants.WEB_VERTICAL_POST_MIN) ? 'column' : 'row',
                    width: '100%',
                    backgroundColor: backgroundColor ? backgroundColor : constants.EMPTY_POST.backgroundColor,
                    color: color,
                    borderRadius: constants.BORDER_RADIUS,
                    boxSizing: 'border-box',
                    maxWidth: constants.MAX_POST_WIDTH,
                    alignItems: 'center',
                    border: `1px solid ${color ? color : constants.EMPTY_POST.color}`,
                }}
            >
                <View
                    style={{
                        flex: '1 1 40%',
                        height: 'auto',
                        overflow: 'hidden',
                        minWidth: url && url.includes('api/photo/readPhoto') ? constants.MIN_PHOTO_WIDTH : constants.MAX_MEDIA_WIDTH,
                        maxWidth: constants.MAX_MEDIA_WIDTH,
                        padding: constants.POST_MEDIA_PADDING,
                        boxSizing: 'border-box',
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
                            resolution={constants.RESOLUTION}
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
                                color: color ? color : constants.EMPTY_POST.color,
                            }}
                        >
                            {name}
                        </Text>
                    )}

                    {description && (
                        <p dangerouslySetInnerHTML={{ __html: description }} style={{
                            fontSize: constants.TEXT_FONT_SIZE,
                            overflow: 'hidden',
                            color: color ? color : constants.EMPTY_POST.color,
                            fontFamily: constants.FONT,
                            lineHeight: constants.TEXT_LINE_HEIGHT,
                        }} />
                    )}
                </View>
            </View>
        </LinkWrapper>
    )
}

export default PostComponent;