import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { setScreen } from "../../data/redux/global.reducer";
import Page from "../components/Page";
import api from "../../data/server/api";
import { Res } from "../../data/constants/types";
import PostComponent from "../components/PostComponent";
import constants from "../../data/constants/constants";
// import axios from "axios";

// const PEXELS_API_KEY = 'AapsNavsOWPuyDk2gvRSO027MiXYVuw1p9KQ0a4zWkVzBmtaDgA19Fsm';
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

    // const [query, setQuery] = useState('moorish architecture');
    // const [images, setImages] = useState<Record<string, any>[]>([]);
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState<string | null>(null);

    // const fetchImages = async () => {
    //     setLoading(true);
    //     setError(null);

    //     const endpoint = `https://api.pexels.com/v1/search?query=${query}&per_page=10`;

    //     try {
    //         const response = await axios.get(endpoint, {
    //             headers: {
    //                 Authorization: PEXELS_API_KEY,
    //             },
    //         });
    //         setImages(response.data.photos);
    //     } catch (err: any) {
    //         setError('Failed to fetch images.');
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    // useEffect(() => {
    //     fetchImages();
    // }, [])

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