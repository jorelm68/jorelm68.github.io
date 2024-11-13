import { usePost } from "../../lib/hooks";
import PostComponent from "./PostComponent";

interface PostWrapperProps {
    post: string;
}

const PostWrapper = ({ post }: PostWrapperProps) => {
    const { name, description, urls, link, color, backgroundColor, start, end} = usePost(post);
    const url = urls[0];

    return (
        <PostComponent
            color={color}
            backgroundColor={backgroundColor}
            url={url}
            name={name}
            description={description}
            link={link}
            start={start}
            end={end}
        />
    )
}

export default PostWrapper;