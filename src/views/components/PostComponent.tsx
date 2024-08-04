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
    const { isAuthenticated } = useAppSelector(state => state.global);
    const post = usePost(_id);

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
                    flexDirection: 'row',
                    width: '100%',
                    backgroundColor: post.backgroundColor ? post.backgroundColor : EMPTY_POST.backgroundColor,
                    color: post.color,
                    textDecoration: 'none',
                    padding: '1%',
                    borderRadius: '8px',
                    boxSizing: 'border-box',
                    maxWidth: '650px',
                    minWidth: '300px',
                }}
            >
                <View
                    style={{
                        flex: '1 1 40%',
                        marginRight: '2%',
                        height: 'auto',
                        overflow: 'hidden'
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
                                height: 'auto'
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
                    }}
                >
                    {post.name && (
                        <Text
                            style={{
                                fontSize: '1.5em',
                                fontWeight: 'bold',
                                marginBottom: '10px',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                color: post.color ? post.color : EMPTY_POST.color,
                            }}
                        >
                            {post.name}
                        </Text>
                    )}

                    {post.description && (
                        <Text
                            style={{
                                fontSize: '1em',
                                overflow: 'hidden',
                                color: post.color ? post.color : EMPTY_POST.color,
                            }}
                        >
                            {post.description}
                        </Text>
                    )}
                </View>

                {isAuthenticated && (
                    <Link
                        to={`/post/${_id}/edit`}
                        style={{
                            textDecoration: 'none',
                            alignSelf: 'flex-end',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '24px',
                            height: '24px',
                        }}
                    >
                        <Text style={{
                            fontSize: '1.5em',
                            color: 'black',
                        }}>
                            🖊
                        </Text>
                    </Link>
                )}
            </Link>
        )
    }
}

export default PostComponent;