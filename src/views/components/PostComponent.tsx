import { Link } from "react-router-dom";
import PhotoComponent from "./PhotoComponent";
import { usePost } from "../../data/server/state";
import { EMPTY_POST } from "../../data/constants/empty";
import View from "./View";
import Text from "./Text";
import { useAppSelector } from "../../data/redux/hooks";

interface PostComponentProps {
    post: string,
}

const PostComponent = ({ post: _id }: PostComponentProps) => {
    const { isAuthenticated, width } = useAppSelector(state => state.global);
    const post = usePost(_id);

    const conditionalBorder = width < 550 || width < 1100 && width >= 800 ? {
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
                    display: 'flex',
                    flexDirection: width < 550 || width < 1100 && width >= 800 ? 'column' : 'row',
                    width: '100%',
                    backgroundColor: post.backgroundColor ? post.backgroundColor : EMPTY_POST.backgroundColor,
                    color: post.color,
                    textDecoration: 'none',
                    borderRadius: '16px',
                    boxSizing: 'border-box',
                    maxWidth: '650px',
                    alignItems: 'center',
                    border: `1px solid ${post.color ? post.color : EMPTY_POST.color}`,
                }}
            >
                <View
                    style={{
                        flex: '1 1 40%',
                        height: 'auto',
                        overflow: 'hidden',
                        minWidth: post.urls[0] && post.urls[0].includes('api/photo/readPhoto') ? '0px' : '226px',
                        maxWidth: post.urls[0] && post.urls[0].includes('api/photo/readPhoto') ? '226px' : '226px',
                    }}
                >
                    {post.urls[0] && post.urls[0].includes('api/photo/readPhoto') ? (
                        <PhotoComponent
                            photo={post.urls[0]}
                            resolution={1080}
                            style={{
                                width: '100%',
                                height: 'auto',
                            }}
                        />
                    ) : (
                        <iframe
                            style={{
                                width: '100%',
                                height: 'auto',
                            }}
                            src={post.urls[0]}
                            title={`YouTube Video`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    )}
                </View>

                <View
                    style={{
                        flex: '1 1 60%',
                        overflow: 'hidden',
                        padding: '2%',
                        ...conditionalBorder,
                    }}
                >
                    {post.name && (
                        <Text
                            style={{
                                fontSize: '1.5em',
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
                            fontSize: '1em',
                            overflow: 'hidden',
                            color: post.color ? post.color : EMPTY_POST.color,
                            fontFamily: 'Nunito',
                            lineHeight: '1.5em',
                        }} />
                    )}
                </View>
            </Link>
        )
    }
}

export default PostComponent;