import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setScreen } from "../../data/redux/global.reducer";
import api from "../../data/server/api";
import { Res } from "../../data/constants/types";
import PostComponent from "../components/PostComponent";


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
        <div className="container" style={{
            position: 'absolute',
            display: 'flex',
            top: 0,
            left: 0,
            margin: 0,
            padding: 8,
            paddingTop: 48 + 20 + 8,
        }}>
            {posts && posts.length > 0 && posts.map((post: any, index: number) => {
                return (
                    <div key={index}>
                        <PostComponent post={post} />
                    </div>
                )
            })}

        </div>
    )
}

export default LandingScreen;