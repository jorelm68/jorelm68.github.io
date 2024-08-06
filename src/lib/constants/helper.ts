import { Dispatch } from "react";
import cache from "../server/cache";
import constants from "./constants";

const handlePhoto = async (photo: any, resolution: number, set: Dispatch<any>): Promise<void> => {
    if (typeof photo === 'string') {
        if (constants.FILE_PREFIXES.some(prefix => photo.startsWith(prefix))) {
            set({ uri: photo });
        } else if (constants.WEBSITE_PREFIXES.some(prefix => photo.startsWith(prefix))) {
            set(photo);
        } else if (constants.BASE64_PREFIXES.some(prefix => photo.startsWith(prefix))) {
            set(photo);
        } else if (constants.STATIC_PREFIXES.some(prefix => photo.startsWith(prefix))) {
            set(photo);
        } else if (photo.startsWith(constants.PHOTO_PREFIX)) {
            await cache.get(photo, resolution).then((uri: string | undefined) => {
                if (uri) {
                    set(uri);
                }
            })
        }
    } else {
        set(photo);
    }
};


export default {
    handlePhoto,
}