import axios from 'axios'
import { Res } from '../constants/types';
import { EMPTY_RES } from '../constants/empty';
// import { API_URL, API_KEY } from '@env'

// const API_URL = 'https://scrap-back-end-6a4f36f8f7ee.herokuapp.com'
const API_URL = 'http://10.0.0.82:4000'
const API_KEY = 'mJvnWmmFvf3wGZu3FcY8hYKaQtxhfHrN4t9x'

async function handlePost(route: string, data?: any, blob: boolean = false): Promise<Res> {
    const response: Res = EMPTY_RES;

    try {
        const formData = new FormData()

        for (const key in data) {
            formData.append(key, data[key])
        }

        const headers: any = {
            'x-api-key': API_KEY,
        }
        if (data) {
            headers['Content-Type'] = 'multipart/form-data'
        }

        const serverResponse = await axios.post(`${API_URL}/${route}`, formData, {
            responseType: blob ? 'blob' : 'json',
            headers,
        });

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
    }

    return response;
}

const routes = {
    general: {
        read: async (model: string, _id: string): Promise<Res> => await handlePost('api/general/read', { model, _id }),
        update: async (model: string, _id: string, data: object): Promise<Res> => await handlePost('api/general/update', { model, _id, rawData: JSON.stringify(data) }),
        push: async (model: string, _id: string, data: object): Promise<Res> => await handlePost('api/general/push', { model, _id, rawData: JSON.stringify(data) }),
        pull: async (model: string, _id: string, data: object): Promise<Res> => await handlePost('api/general/pull', { model, _id, rawData: JSON.stringify(data) }),
        exists: async (model: string, data: object): Promise<Res> => await handlePost('api/general/exists', { model, rawData: JSON.stringify(data) }),
        clean: async (models: string[]): Promise<Res> => await handlePost('api/general/clean', { rawModels: JSON.stringify(models) }),
        factoryReset: async (): Promise<Res> => await handlePost('api/general/factoryReset'),
    },
    photo: {
        createPhoto: async (uri: string) => await handlePost('api/photo/createPhoto', { file: { uri, type: 'image/jpeg', name: 'file' } }),
        readPhoto: async (photo: string, resolution: number) => await handlePost('api/photo/readPhoto', { photo, resolution }, true),
        updatePhoto: async (photo: string, uri: string) => await handlePost('api/photo/updatePhoto', { photo, file: { uri, type: 'image/jpeg', name: 'file' } }),
        deletePhoto: async (photo: string) => await handlePost('api/photo/deletePhoto', { photo }),
    },
    post: {
        searchPosts: async (query: string) => await handlePost('api/portfolio/post/searchPosts', { query }),
    }
}

export default routes;