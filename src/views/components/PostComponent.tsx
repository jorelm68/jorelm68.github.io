import { Link } from "react-router-dom";
import PhotoComponent from "./PhotoComponent";
import { usePost } from "../../lib/server/state";
import { EMPTY_POST } from "../../lib/constants/empty";
import View from "./View";
import Text from "./Text";
import { useAppSelector } from "../../lib/redux/hooks";
import constants from "../../lib/constants/constants";
import styles from "../../lib/constants/styles";

interface PostComponentProps {
    post: string,
}

const PostComponent = ({ post: _id }: PostComponentProps) => {
    const { width } = useAppSelector(state => state.global);
    const post = usePost(_id);

    const conditionalBorder = (width < constants.MOBILE_THRESHOLD) || (width < constants.WEB_VERTICAL_POST_MAX && width >= constants.WEB_VERTICAL_POST_MIN) ? {
        borderTop: `1px solid ${post.color}`,
    } : {
        borderLeft: `1px solid ${post.color}`,
    }

    if (!post) {
        return (
            <View />
        )
    }

    else {
        return (
            <Link
                to={post.link ? post.link : EMPTY_POST.link}
                style={{
                    ...styles.reset,
                    display: 'flex',
                    flexDirection: (width < constants.MOBILE_THRESHOLD) || (width < constants.WEB_VERTICAL_POST_MAX && width >= constants.WEB_VERTICAL_POST_MIN) ? 'column' : 'row',
                    width: '100%',
                    backgroundColor: post.backgroundColor ? post.backgroundColor : EMPTY_POST.backgroundColor,
                    color: post.color,
                    borderRadius: constants.BORDER_RADIUS,
                    boxSizing: 'border-box',
                    maxWidth: constants.MAX_POST_WIDTH,
                    alignItems: 'center',
                    border: `1px solid ${post.color ? post.color : EMPTY_POST.color}`,
                }}
            >
                <View
                    style={{
                        flex: '1 1 40%',
                        height: 'auto',
                        overflow: 'hidden',
                        minWidth: post.urls[0] && post.urls[0].includes('api/photo/readPhoto') ? constants.MIN_PHOTO_WIDTH : constants.MAX_MEDIA_WIDTH,
                        maxWidth: constants.MAX_MEDIA_WIDTH,
                    }}
                >
                    {post.urls[0] && post.urls[0].includes('youtube') ? (
                        <iframe
                            style={{
                                width: '100%',
                                height: 'auto',
                            }}
                            src={post.urls[0]}
                            title={`YouTube Video`}
                            frameBorder="0"
                            allow={constants.VIDEO_ALLOW}
                            allowFullScreen
                        />
                    ) : (
                        <PhotoComponent
                            photo={post.urls[0]}
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
                    {post.name && (
                        <Text
                            style={{
                                fontSize: constants.TITLE_FONT_SIZE,
                                fontWeight: 'bold',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                textAlign: 'center',
                                color: post.color ? post.color : EMPTY_POST.color,
                            }}
                        >
                            {post.name}
                        </Text>
                    )}

                    {post.description && (
                        <p dangerouslySetInnerHTML={{ __html: post.description }} style={{
                            fontSize: constants.TEXT_FONT_SIZE,
                            overflow: 'hidden',
                            color: post.color ? post.color : EMPTY_POST.color,
                            fontFamily: constants.FONT,
                            lineHeight: constants.TEXT_LINE_HEIGHT,
                        }} />
                    )}
                </View>
            </Link>
        )
    }
}

export default PostComponent;