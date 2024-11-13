import { Link } from "react-router-dom";
import PhotoComponent from "./PhotoComponent";
import View from "./View";
import Text from "./Text";
import { useAppSelector } from "../../redux/hooks";
import constants from "../../lib/constants";
import styles from "../../lib/styles";
import helper from "../../lib/helper";

interface PostComponentProps {
    color: string,
    backgroundColor: string,
    url: string,
    name: string,
    description: string,
    link?: string,
    start?: string,
    end?: string,
}

interface LinkWrapperProps {
    link?: string,
    children: React.ReactNode,
}

const LinkWrapper = ({ link, children }: LinkWrapperProps) => {
    let sanitizedLink = link;
    if (link && link.includes('Post-')) {
        // Use the relative path from the root, get rid of the domain
        // Split at /#
        const splitLink = link.split('/#');
        if (splitLink.length > 1) {
            sanitizedLink = splitLink[1];
        }
    }    

    console.log(sanitizedLink)

    return sanitizedLink ? (
        <Link to={sanitizedLink} style={{
            ...styles.reset,
            display: 'flex',
            width: '100%',
            maxWidth: constants.MAX_POST_WIDTH,
            alignItems: 'center',
        }}>
            {children}
        </Link>
    ) : (
        <>{children}</>
    )
}

const PostComponent = ({ color, link, backgroundColor, url, name, description, start, end }: PostComponentProps) => {
    const { width } = useAppSelector(state => state.global);

    let dateDisplay = undefined;
    if (start && end) {
        if (helper.formatDate(start) == helper.formatDate(end)) {
            dateDisplay = helper.formatDate(start);
        }
        else {
            dateDisplay = helper.formatDateRange(start, end);
        }
    }
    if (start && !end) {
        dateDisplay = `${helper.formatDate(start)} - Present`;
    }

    return (
        <LinkWrapper link={link}>
            <View
                style={{
                    ...styles.reset,
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                    flexDirection: (width < constants.WEB_VERTICAL_POST_MIN) || (width < constants.WEB_VERTICAL_POST_MAX && width >= constants.WEB_VERTICAL_POST_MIN) ? 'column' : 'row',
                    backgroundColor: constants.SKIN_TONE(),
                    color: color,
                    borderRadius: constants.BORDER_RADIUS,
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
                                textDecoration: link ? 'underline' : 'none',
                                color: color ? color : constants.EMPTY_POST.color,
                            }}
                        >
                            {name}
                        </Text>
                    )}

                    {(start || end) && (
                        <Text
                            style={{
                                fontSize: constants.DATE_FONT_SIZE,
                                fontStyle: 'italic',
                                color: color ? color : constants.EMPTY_POST.color,
                                textAlign: 'center',
                            }}
                        >
                            {dateDisplay}
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