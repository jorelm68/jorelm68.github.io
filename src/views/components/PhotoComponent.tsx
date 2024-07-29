import React, { useEffect, useState } from "react";
import photos from "../../data/constants/photos";
import cache from "../../data/server/cache";
import { Res } from "../../data/constants/types";

interface PhotoComponentProps {
    photo: string,
    resolution?: number,
    width?: string,
    height?: string,
    style?: React.CSSProperties,
}

const PhotoComponent = ({ photo, resolution = 1080, width, height, style }: PhotoComponentProps) => {
    const [source, setSource] = useState(photos.defaultImage);
    
    useEffect(() => {
        const fetchPhoto = async () => {
            if (typeof photo === 'string') {
                if (photo.startsWith("file://") || photo.startsWith('http')) {
                    setSource({ uri: photo });
                }
                else {
                    const data = await cache.get(photo, resolution);
                    setSource({ uri: data.uri });
                }
            }
            else {
                setSource(photo);
            }
        };

        fetchPhoto();
    }, [photo, resolution]);


    return (
        <div style={style ? style : {
            display: 'flex',
            width: '100%',
            height: '100%',
        }}>
            <img src={source} alt="" style={{
                width: width ? width : 'auto',
                height: height ? height : 'auto',
                objectFit: 'cover',
            }} />
        </div>
    );
}

export default PhotoComponent;