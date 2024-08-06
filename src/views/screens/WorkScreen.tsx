import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { setScreen } from "../../lib/redux/global.reducer";
import Page from "../components/Page";
import api from "../../lib/server/api";
import { Res } from "../../lib/constants/types";
import PostComponent from "../components/PostComponent";
import constants from "../../lib/constants/constants";

const FULL_WIDTH = '90%';

export default function WorkScreen() {
    const dispatch = useDispatch();
    useEffect(() => {
        document.title = 'Work | Ethan McIntyre';
        dispatch(setScreen('WorkScreen'));
    }, [dispatch])

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        api.post.searchPosts('').then((res: Res) => {
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
            scrollbarWidth: 'auto',
            height: 'auto',
            width: FULL_WIDTH,
            marginLeft: constants.SIDE_GAP,
        }}>
            {posts.map((post, index) => {
                return (
                    <PostComponent key={index} post={post} />
                )
            })}
        </Page>
    )
}