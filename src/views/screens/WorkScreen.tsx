import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { setScreen } from "../../data/redux/global.reducer";
import Page from "../components/Page";
import Text from "../components/Text";
import View from "../components/View";
import api from "../../data/server/api";
import { Res } from "../../data/constants/types";
import PostComponent from "../components/PostComponent";

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
            paddingTop: '48px',
            paddingBottom: '32px',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '16px',
            boxSizing: 'border-box',
            scrollbarWidth: 'auto',
        }}>
            {posts.map((post, index) => {
                return (
                    <PostComponent key={index} post={post} />
                )
            })}
        </Page>
    )
}