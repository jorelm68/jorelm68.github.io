import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { setScreen } from "../../redux/global.reducer";
import Page from "../components/Page";
import api from "../../lib/api";
import { Res } from "../../lib/types";
import PostComponent from "../components/PostComponent";
import constants from "../../lib/constants";
import { usePost } from "../../lib/hooks";

const FULL_WIDTH = '90%';

export default function ClassScreen() {
    const dispatch = useDispatch();
    useEffect(() => {
        document.title = 'Class | Ethan McIntyre';
        dispatch(setScreen('ClassScreen'));
    }, [dispatch])

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        api.post.searchPosts('class').then((res: Res) => {
            setPosts(res.data);
        })
    }, [])

    return (
        <Page style={{
            paddingTop: constants.HEADER_HEIGHT + constants.DEFAULT_PADDING,
            paddingBottom: constants.DEFAULT_PADDING,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: constants.POST_GAP,
            width: FULL_WIDTH,
            marginLeft: constants.SIDE_GAP,
            overflowY: 'auto',
        }}>
            {posts.map((post, index) => {
                return <PostWrapper key={index} post={post} />
            })}
        </Page>
    )
}

interface PostWrapperProps {
    post: string;
}

const PostWrapper = ({ post }: PostWrapperProps) => {
    const { name, description, urls, link, color, backgroundColor } = usePost(post);
    const url = urls[0];

    return (
        <PostComponent
            color={color}
            backgroundColor={backgroundColor}
            url={url}
            name={name}
            description={description}
            link={link}
        />
    )
}