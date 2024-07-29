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
            <Link to={post.link ? post.link : EMPTY_POST.link} style={{
                textDecoration: 'none',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                maxWidth: post.maxWidth ? post.maxWidth : EMPTY_POST.maxWidth,
                maxHeight: post.maxHeight ? post.maxHeight : EMPTY_POST.maxHeight,
                minWidth: post.minWidth ? post.minWidth : EMPTY_POST.minWidth,
                minHeight: post.minHeight ? post.minHeight : EMPTY_POST.minHeight,
                padding: 8,
                borderRadius: 8,
                gap: 8,
                backgroundColor: post.backgroundColor ? post.backgroundColor : EMPTY_POST.backgroundColor,
                flexDirection: (post.flexDirection) as 'row' | 'column' || EMPTY_POST.flexDirection,  // Explicit type assertion
            }}>
                <View style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: post.photoWidth ? post.photoWidth : EMPTY_POST.photoWidth,
                    height: post.photoHeight ? post.photoHeight : EMPTY_POST.photoHeight,
                }}>
                    <PhotoComponent
                        photo={post.photo ? post.photo : EMPTY_POST.photo}
                        resolution={1080}
                    />
                </View>
                <View style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                }}>
                    <Text style={{
                        margin: 0,
                        padding: 0,
                        fontSize: 24,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        color: post.color ? post.color : EMPTY_POST.color
                    }}>{post.name ? post.name : EMPTY_POST.name}</Text>
                    <Text style={{
                        margin: 0,
                        padding: 0,
                        fontSize: 16,
                        color: post.color ? post.color : EMPTY_POST.color
                    }}>{post.description ? post.description : EMPTY_POST.description}</Text>
                </View>
            </Link >
        )
    }
}

export default PostComponent;
