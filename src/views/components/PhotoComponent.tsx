import { useState, useEffect, HTMLAttributes } from "react";
import photos from "../../lib/constants/photos";
import cache from "../../lib/server/cache";
import View from "./View";

const WEBSITE_PREFIXES = ['https://', 'http://'];
const BASE64_PREFIXES = ['data:image/png;base64,', 'data:image/jpeg;base64,', 'data:image/jpg;base64,'];
const FILE_PREFIXES = ['file://'];
const STATIC_PREFIXES = ['/static/media/'];
const PHOTO_PREFIX = 'Photo-';

interface PhotoComponentProps extends HTMLAttributes<HTMLImageElement> {
    photo: string | File;
    resolution?: number;
}

export default function PhotoComponent({ photo, resolution = 1080, ...rest }: PhotoComponentProps) {
    const [source, setSource] = useState(photos.defaultImage);

    useEffect(() => {
        const fetchPhoto = async () => {
            if (typeof photo === 'string') {
                if (FILE_PREFIXES.some(prefix => photo.startsWith(prefix))) {
                    setSource({ uri: photo });
                } else if (WEBSITE_PREFIXES.some(prefix => photo.startsWith(prefix))) {
                    setSource(photo);
                } else if (BASE64_PREFIXES.some(prefix => photo.startsWith(prefix))) {
                    setSource(photo);
                } else if (STATIC_PREFIXES.some(prefix => photo.startsWith(prefix))) {
                    setSource(photo);
                } else if (photo.startsWith(PHOTO_PREFIX)) {
                    await cache.get(photo, resolution).then((uri: string | undefined) => {
                        if (uri) {
                            setSource(uri);
                        }
                    })
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
