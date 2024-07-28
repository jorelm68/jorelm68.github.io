import React, { useEffect, useState } from "react";
import photos from "../../data/constants/photos";
import cache from "../../data/server/cache";

interface PhotoComponentProps {
    photo: string,
    resolution?: number,
    width?: string,
    height?: string,
    style?: React.CSSProperties,
}

const PhotoComponent = ({ photo, resolution = 1080, width, height, style }: PhotoComponentProps) => {
    const defaultPhoto = "https://via.placeholder.com/150";

    const [source, setSource] = useState(photos.defaultImage);

    useEffect(() => {
        const fetchPhoto = async () => {
            if (typeof photo === 'string') {
                let type: { uri: string } = { uri: photos.defaultImage };
                if (photo.startsWith("file://")) {
                    type = { uri: photo };
                }
                else {
                    type = await cache.get(photo, resolution);
                }

                if (type) {
                    setSource(type);
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
            <img src={photo ? photo : defaultPhoto} alt="Photo" style={{
                width: width ? width : 'auto',
                height: height ? height : 'auto',
                objectFit: 'cover',
            }} />
        </div>
    );
}

export default PhotoComponent;