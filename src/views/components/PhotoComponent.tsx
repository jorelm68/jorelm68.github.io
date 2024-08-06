import { useState, useEffect, HTMLAttributes } from "react";
import photos from "../../lib/constants/photos";
import View from "./View";
import helper from "../../lib/constants/helper";
import constants from "../../lib/constants/constants";

interface PhotoComponentProps extends HTMLAttributes<HTMLImageElement> {
    photo: string | File;
    resolution?: number;
}

export default function PhotoComponent({ photo, resolution = constants.RESOLUTION, ...rest }: PhotoComponentProps) {
    const [source, setSource] = useState<any>(photos.defaultImage);

    useEffect(() => {
        helper.handlePhoto(photo, resolution).then((uri: any) => {
            setSource(uri);
        });
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
