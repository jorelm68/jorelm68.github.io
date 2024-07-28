import { Link } from "react-router-dom";
import PhotoComponent from "./PhotoComponent";
import { usePost } from "../../data/server/state";

interface PostComponentProps {
    post: string,
}

const PostComponent = ({ post: _id }: PostComponentProps) => {
    const post = usePost(_id);

    const defaultPost = {
        title: "Default Title",
        body: "Default Body. Click here to go to the home page. This is a default post. You can pass a post object to this component to override this default post. The post object should have the following properties: title, body, photo, maxWidth, maxHeight, minWidth, minHeight, photoWidth, photoHeight, color, backgroundColor, link, flexDirection.",
        photo: "https://via.placeholder.com/200",
        maxWidth: '100%',
        maxHeight: '100%',
        minWidth: '200px',
        minHeight: '200px',
        photoWidth: '200px',
        photoHeight: '200px',
        color: 'black',
        backgroundColor: "white",
        link: '/',
        flexDirection: 'row' as 'row' | 'column',  // Explicit type assertion
        createdAt: new Date(),
    }

    return (
        <Link to={post && post.link ? post.link : defaultPost.link} style={{
            textDecoration: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: post && post.maxWidth ? post.maxWidth : defaultPost.maxWidth,
            maxHeight: post && post.maxHeight ? post.maxHeight : defaultPost.maxHeight,
            minWidth: post && post.minWidth ? post.minWidth : defaultPost.minWidth,
            minHeight: post && post.minHeight ? post.minHeight : defaultPost.minHeight,
            padding: 8,
            borderRadius: 8,
            gap: 8,
            backgroundColor: post && post.backgroundColor ? post.backgroundColor : defaultPost.backgroundColor,
            flexDirection: (post && post.flexDirection) as 'row' | 'column' || defaultPost.flexDirection,  // Explicit type assertion
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <PhotoComponent 
                    photo={post && post.photo ? post.photo : defaultPost.photo} 
                    width={post ? post.photoWidth : defaultPost.photoWidth} 
                    height={post ? post.photoHeight : defaultPost.photoHeight} 
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
                    color: post && post.color ? post.color : defaultPost.color
                }}>{post && post.title ? post.title : defaultPost.title}</p>
                <p style={{
                    margin: 0,
                    padding: 0,
                    fontSize: 16,
                    color: post && post.color ? post.color : defaultPost.color
                }}>{post && post.body ? post.body : defaultPost.body}</p>
            </div>
        </Link >
    );
}

export default PostComponent;
