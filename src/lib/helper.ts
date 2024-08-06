import cache from "./cache";
import constants from "./constants";
import files from "./files";
import axios from "axios";

const handlePhoto = async (photo: any, resolution: number): Promise<any> => {
    if (typeof photo === 'string') {
        if (constants.FILE_PREFIXES.some(prefix => photo.startsWith(prefix))) {
            return { uri: photo };
        } else if (constants.WEBSITE_PREFIXES.some(prefix => photo.startsWith(prefix))) {
            return photo;
        } else if (constants.BASE64_PREFIXES.some(prefix => photo.startsWith(prefix))) {
            return photo;
        } else if (constants.STATIC_PREFIXES.some(prefix => photo.startsWith(prefix))) {
            return photo;
        } else if (photo.startsWith(constants.PHOTO_PREFIX)) {
            await cache.get(photo, resolution).then((uri: string | undefined) => {
                if (uri) {
                    return uri;
                }
            })
        }
    }

    return files.defaultImage;
};

const handlePexels = async (query: string, numResults: number = 10): Promise<Record<string, any>[]> => {
    const endpoint = `https://api.pexels.com/v1/search?query=${query}&per_page=${numResults}`;

    try {
        const response = await axios.get(endpoint, {
            headers: {
                Authorization: constants.PEXELS_API_KEY,
            },
        });

        return response.data.photos;
    } catch (err: any) {
        console.error('Failed to fetch images from Pexels.', err);

        return [];
    }
};

export default {
    handlePhoto,
    handlePexels,
}