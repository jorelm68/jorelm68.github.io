import { useEffect, useState } from "react";
import api from "./api";
import { Blank, Post, Res } from "../constants/types";
import { EMPTY_BLANK, EMPTY_POST } from "../constants/empty";

// Generic hook for fetching data
function useFetch<T>(type: string, id: string, initialData: T): T {
    const [data, setData] = useState<T>(initialData);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        const fetchData = async (id: string) => {
            if (!id) return;
    
            api.general.read(type, id).then((res: Res) => {
                if (res.success) {
                    setData(res.data);
                }
            })
        };

        fetchData(id);
    }, [type, id, refresh]);

    useEffect(() => {
        const interval = setInterval(() => {
            setRefresh(new Date().getTime());
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, [])

    return data;
}

export const usePost = (post: string): Post => useFetch('Post', post, EMPTY_POST)
export const useBlank = (): Blank => useFetch('Blank', '', EMPTY_BLANK);