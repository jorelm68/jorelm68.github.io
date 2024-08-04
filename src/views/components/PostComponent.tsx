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
                    width: '40vw',
                    minWidth: '400px',
                    maxWidth: '40vw',
                    backgroundColor: post.backgroundColor ? post.backgroundColor : EMPTY_POST.backgroundColor,
                    color: post.color,
                    textDecoration: 'none',
                    padding: '10px',
                    maxHeight: '200px',
                    minHeight: '200px',
                    overflow: 'hidden',
                    borderRadius: '8px',
                }}
            >
                <View
                    style={{
                        flex: '0 0 auto',
                        width: 'auto',
                        height: '200px',
                        marginRight: '10px',
                        overflow: 'hidden'
                    }}
                >
                    {post.urls[0] && post.urls[0].includes('api/photo/readPhoto') ? (
                        <PhotoComponent
                            photo={post.urls[0]}
                            resolution={1080}
                            style={{
                                height: '100%',
                                width: 'auto',
                            }}
                        />
                    ) : (
                        <iframe
                            src={post.urls[0]}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            title={post.name}
                            style={{
                                height: '100%',
                                width: 'auto',
                            }}
                        />
                    )}
                </View>
                <View
                    style={{
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
                                height: '32px',
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
