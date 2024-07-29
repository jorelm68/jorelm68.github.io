import { useState, useEffect } from "react";
import photos from "../../data/constants/photos";
import cache from "../../data/server/cache";

interface PhotoComponentProps {
    photo: string;
    resolution?: number;
    style?: object;
}

export default function PhotoComponent({ photo, resolution = 1080, style }: PhotoComponentProps) {
    const [source, setSource] = useState(photos.defaultImage);

    useEffect(() => {
        const fetchPhoto = async () => {
            if (typeof photo === 'string') {
                if (photo.startsWith("file://")) {
                    // Handling a local file
                    setSource({ uri: photo });
                } else if (photo.startsWith('http')) {
                    // Handling a link to an image
                    setSource(photo);
                } else if (photo.startsWith('data:image')) {
                    // Handling base64 data directly
                    setSource(photo);
                } else if (photo) {
                    // Handling a photo ID from the backend
                    const uri: string | undefined = await cache.get(photo, resolution);
                    if (uri) {
                        setSource(uri);
                    }
                }
            } else {
                setSource(photo);
            }
        };

        fetchPhoto();
    }, [photo, resolution]);

    return (
        <img alt="" src={source} style={{
            width: '100%',
            height: '100%',
            ...style,
        }} />
    );
}
