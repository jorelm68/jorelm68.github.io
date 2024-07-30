import { Link } from "react-router-dom";
import PhotoComponent from "./PhotoComponent";
import { usePost } from "../../data/server/state";
import { EMPTY_POST } from "../../data/constants/empty";
import View from "./View";
import Text from "./Text";

interface PostComponentProps {
    post: string,
}

const PostComponent = ({ post: _id }: PostComponentProps) => {
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
                    <PhotoComponent
                        photo={post.media && post.media.length > 0 ? post.media[0] : EMPTY_POST.media[0]}
                        resolution={1080}
                        style={{
                            height: '100%',
                            width: 'auto',
                        }}
                    />
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
            </Link>
        )
    }
}

export default PostComponent;
