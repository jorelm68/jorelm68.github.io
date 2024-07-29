import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setScreen } from "../../data/redux/global.reducer";
import api from "../../data/server/api";
import { Res } from "../../data/constants/types";
import PostComponent from "../components/PostComponent";
import Page from "../components/Page";
import View from "../components/View";


const LandingScreen = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setScreen('LandingScreen'));
    }, [dispatch])

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        api.post.searchPosts('').then((res: Res) => {
            if (res.success) {
                setPosts(res.data);
            }
        })
    }, []);

    return (
        <Page>
            {posts && posts.length > 0 && posts.map((post: any, index: number) => {
                return (
                    <View key={index}>
                        <PostComponent post={post} />
                    </View>
                )
            })}
        </Page>
    )
}

export default LandingScreen;