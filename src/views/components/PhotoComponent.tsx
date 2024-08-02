import { useState, useEffect, HTMLAttributes } from "react";
import photos from "../../data/constants/photos";
import cache from "../../data/server/cache";
import View from "./View";

interface PhotoComponentProps extends HTMLAttributes<HTMLImageElement> {
    photo: string | File;
    resolution?: number;
}

export default function PhotoComponent({ photo, resolution = 1080, ...rest }: PhotoComponentProps) {
    const [source, setSource] = useState(photos.defaultImage);

    useEffect(() => {
        const fetchPhoto = async () => {
            if (typeof photo === 'string') {
                if (photo.startsWith("file://")) {
                    // Handling a local file
                    setSource({ uri: photo });
                } else if (photo.includes('https://') || photo.includes('http://')) {
                    // Handling a link to an image
                    setSource(photo);
                } else if (photo.startsWith('data:image')) {
                    // Handling base64 data directly
                    setSource(photo);
                } else if (photo.startsWith('/static/media/')) {
                    // Handling a photo from the frontend
                    setSource(photo);
                } else if (photo.startsWith('Photo-')) {
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

    if (source === photos.defaultImage) {
        return <View />;
    }

    return (
        <img alt="" {...rest} src={source} style={{
            width: '100%',
            height: '100%',
            ...rest.style,
        }} />
    );
}
