import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { setScreen } from "../../data/redux/global.reducer";
import Page from "../components/Page";
import Text from "../components/Text";
import View from "../components/View";
import api from "../../data/server/api";
import { Res } from "../../data/constants/types";
import PostComponent from "../components/PostComponent";
import axios from "axios";
import PhotoComponent from "../components/PhotoComponent";
import photos from "../../data/constants/photos";

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






    const [query, setQuery] = useState('moorish architecture');
    const [images, setImages] = useState<Record<string, any>[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchImages = async () => {
        setLoading(true);
        setError(null);

        const API_KEY = 'AapsNavsOWPuyDk2gvRSO027MiXYVuw1p9KQ0a4zWkVzBmtaDgA19Fsm'; // Replace with your Pexels API key
        const endpoint = `https://api.pexels.com/v1/search?query=${query}&per_page=10`;

        try {
            const response = await axios.get(endpoint, {
                headers: {
                    Authorization: API_KEY,
                },
            });
            setImages(response.data.photos);
        } catch (err: any) {
            setError('Failed to fetch images.');
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchImages();
    }, [])
    console.log(images);

    return (
        <Page style={{
            paddingTop: `${48}px`,
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

            <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/8Ls7maJvjwQ"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>

            {/* {images.map((image, index) => {
                return (
                    <PhotoComponent key={index} photo={image.src.original} style={{
                        width: 'calc(50% - 16px)',
                        height: 'calc(50% - 16px)',
                        objectFit: 'cover',
                    }} />
                )
            })} */}
        </Page>
    )
}