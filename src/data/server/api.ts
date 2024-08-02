import axios from 'axios'
import { Res } from '../constants/types'
import { EMPTY_RES } from '../constants/empty'

const numbers = '172.25.240.1'

const localURL = `http://${numbers}:4000`
const serverURL = 'https://jorelm68-1dc8eff04a80.herokuapp.com'

async function fetchFileFromUri(uri: string): Promise<File> {
    const response = await fetch(uri);
    const blob = await response.blob();
    return new File([blob], 'filename.jpg', { type: blob.type });
}

async function handleRequest(route: string, type: string, data?: any, blob: boolean = false): Promise<Res> {
    const response: Res = EMPTY_RES;

    try {
        const formData = new FormData()

        // Handle file conversion if needed
        for (const key in data) {
            if (key.includes('file') && typeof data[key] === 'string') {
                // Convert URI to File if necessary
                const file = await fetchFileFromUri(data[key]);
                formData.append(key, file);
            } else {
                formData.append(key, data[key]);
            }
        }

        const headers: any = {
        }
        if (data) {
            headers['Content-Type'] = 'multipart/form-data'
        }

        let serverResponse = null;
        if (type === 'POST') {
            console.log('POST', `${serverURL}/${route}`, formData);
            serverResponse = await axios.post(`${localURL}/${route}`, formData, {
                responseType: blob ? 'blob' : 'json',
                headers,
            });
        }
        else if (type === 'GET') {
            serverResponse = await axios.get(`${serverURL}/${route}`, {
                params: data,
                responseType: blob ? 'blob' : 'json',
                headers,
            });
        }


        if (!serverResponse) {
            throw new Error('No response from the server');
        }
        if (serverResponse.status !== 200) {
            throw new Error(serverResponse.data.errorMessage);
        }

        if (blob) {
            // Handle an image response
            const blob = await serverResponse.data
            const reader = new FileReader()
            reader.readAsDataURL(blob)
            const base64data = await new Promise<string>((resolve, reject) => {
                reader.onloadend = () => resolve(reader.result as string);
                reader.onerror = () => reject('Error reading the blob data');
            });
            response.data = { uri: base64data };
        }
        else {
            // Handle a JSON response
            response.data = serverResponse.data;
        }

        response.status = 200;
        response.success = true;
        response.errorMessage = '';
    } catch (error: any) {
        response.status = error.response.status;
        response.success = false;
        response.errorMessage = error?.response?.data?.errorMessage || error?.message || 'An error occured during the API request';

        console.error(error);
    }

    return response;
}

export default {
    general: {
        read: async (model: string, _id: string): Promise<Res> => await handleRequest('api/general/read', 'POST', { model, _id }),
        update: async (model: string, _id: string, data: object): Promise<Res> => await handleRequest('api/general/update', 'POST', { model, _id, rawData: JSON.stringify(data) }),
        push: async (model: string, _id: string, data: object): Promise<Res> => await handleRequest('api/general/push', 'POST', { model, _id, rawData: JSON.stringify(data) }),
        pull: async (model: string, _id: string, data: object): Promise<Res> => await handleRequest('api/general/pull', 'POST', { model, _id, rawData: JSON.stringify(data) }),
        exists: async (model: string, data: object): Promise<Res> => await handleRequest('api/general/exists', 'POST', { model, rawData: JSON.stringify(data) }),
        clean: async (models: string[]): Promise<Res> => await handleRequest('api/general/clean', 'POST', { rawModels: JSON.stringify(models) }),
        factoryReset: async (): Promise<Res> => await handleRequest('api/general/factoryReset', 'POST'),
    },
    photo: {
        createPhoto: async (uri: string) => await handleRequest('api/photo/createPhoto', 'POST', { file: { uri, type: 'image/jpeg', name: 'file' } }),
        readPhoto: async (photo: string, resolution: number) => await handleRequest(`api/photo/readPhoto/${photo}/${resolution}`, 'GET', undefined, true),
        updatePhoto: async (photo: string, uri: string) => await handleRequest('api/photo/updatePhoto', 'POST', { photo, file: uri }),
        deletePhoto: async (photo: string) => await handleRequest('api/photo/deletePhoto', 'POST', { photo }),
    },
    post: {
        searchPosts: async (query: string) => await handleRequest('api/portfolio/post/searchPosts', 'POST', { query }),
        createPost: async ({
            name,
            description,
            selectors,
            media,
            captions,
            essay,
            link,
            color,
            backgroundColor,
            start,
            end,
            location,
        }: {
            name: string,
            description: string,
            selectors: string,
            media: string[],
            captions: string[],
            essay: string,
            link: string,
            color: string,
            backgroundColor: string,
            start: string,
            end: string,
            location: string,
        }) => {
            // Create an object with media files as key-value pairs
            const mediaData = media.reduce((acc, uri, index) => {
                // Only add image data, skip youtube ids
                if (uri.startsWith('data:image')) {
                    acc[`file${index}`] = uri;
                }
                return acc;
            }, {} as Record<string, string>);

            // Replace image URLs in the media list with 'placeholder'
            const processedMedia = media.map(uri => uri.startsWith('data:image') ? 'placeholder' : uri);

            // Construct the final payload
            const payload = {
                name,
                description,
                selectors,
                media: processedMedia,
                captions,
                essay,
                link,
                color,
                backgroundColor,
                start,
                end,
                location,
                numPhotos: media.filter(uri => uri.startsWith('data:image')).length,
            };

            // Send the payload to the backend
            return await handleRequest('api/portfolio/post/createPost', 'POST', {
                rawData: JSON.stringify(payload),
                ...mediaData,
            });
        },
        updatePost: async (_id: string, {
            name,
            description,
            selectors,
            media,
            captions,
            essay,
            link,
            color,
            backgroundColor,
            start,
            end,
            location,
        }: {
            name: string,
            description: string,
            selectors: string,
            media: string[],
            captions: string[],
            essay: string,
            link: string,
            color: string,
            backgroundColor: string,
            start: string,
            end: string,
            location: string,
        }) => {
            let sameMedia = [];
            let newMedia = [];
            for (const uri of media) {
                if (uri.startsWith('Photo')) {
                    sameMedia.push(uri);
                }
                else {
                    newMedia.push(uri);
                    sameMedia.push('placeholder');
                }
            }

            // Create an object with media files as key-value pairs
            const mediaData = newMedia.reduce((acc, uri, index) => {
                acc[`file${index}`] = uri;
                return acc;
            }, {} as Record<string, string>);

            // Construct the final payload
            const payload = {
                name,
                description,
                selectors,
                captions,
                essay,
                media: sameMedia,
                link,
                color,
                backgroundColor,
                start,
                end,
                location,
                numPhotos: newMedia.length,
            };

            // Send the payload to the backend
            return await handleRequest('api/portfolio/post/updatePost', 'POST', {
                _id,
                rawData: JSON.stringify(payload),
                ...mediaData,
            });
        },
        deletePost: async (_id: string) => await handleRequest('api/portfolio/post/deletePost', 'POST', { _id }),
    },
}