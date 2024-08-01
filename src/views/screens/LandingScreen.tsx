import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setScreen } from "../../data/redux/global.reducer";
import api from "../../data/server/api";
import { Res } from "../../data/constants/types";
import PostComponent from "../components/PostComponent";
import Page from "../components/Page";
import View from "../components/View";
import PhotoComponent from "../components/PhotoComponent";
import photos from "../../data/constants/photos";
import MeComponent from "../components/MeComponent";

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
        <Page style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            alignContent: 'flex-end',
            gap: 16,
        }}>
            <MeComponent />
        </Page>
    )
}

export default LandingScreen;