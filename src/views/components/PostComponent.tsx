import { Link } from "react-router-dom";
import PhotoComponent from "./PhotoComponent";
import { usePost } from "../../data/server/state";
import { EMPTY_POST } from "../../data/constants/empty";

interface PostComponentProps {
    post: string,
}

const PostComponent = ({ post: _id }: PostComponentProps) => {
    const post = usePost(_id);

    return (
        <Link to={post && post.link ? post.link : EMPTY_POST.link} style={{
            textDecoration: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: post && post.maxWidth ? post.maxWidth : EMPTY_POST.maxWidth,
            maxHeight: post && post.maxHeight ? post.maxHeight : EMPTY_POST.maxHeight,
            minWidth: post && post.minWidth ? post.minWidth : EMPTY_POST.minWidth,
            minHeight: post && post.minHeight ? post.minHeight : EMPTY_POST.minHeight,
            padding: 8,
            borderRadius: 8,
            gap: 8,
            backgroundColor: post && post.backgroundColor ? post.backgroundColor : EMPTY_POST.backgroundColor,
            flexDirection: (post && post.flexDirection) as 'row' | 'column' || EMPTY_POST.flexDirection,  // Explicit type assertion
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <PhotoComponent 
                    photo={post && post.photo ? post.photo : EMPTY_POST.photo} 
                    width={post ? post.photoWidth : EMPTY_POST.photoWidth} 
                    height={post ? post.photoHeight : EMPTY_POST.photoHeight} 
                    resolution={1080}
                />
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
            }}>
                <p style={{
                    margin: 0,
                    padding: 0,
                    fontSize: 24,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: post && post.color ? post.color : EMPTY_POST.color
                }}>{post && post.name ? post.name : EMPTY_POST.name}</p>
                <p style={{
                    margin: 0,
                    padding: 0,
                    fontSize: 16,
                    color: post && post.color ? post.color : EMPTY_POST.color
                }}>{post && post.description ? post.description : EMPTY_POST.description}</p>
            </div>
        </Link >
    );
}

export default PostComponent;
