import axiosHandler from "./axios";

export async function getFeed(token: string, page: number, pageLimit: number) {
    try {
        const { data, status } = await axiosHandler.get(`/feed/${page}/${pageLimit}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': "Bearer " + `${token}`,
            },
        });
        return {
            data,
            status,
        };
    } catch (error) {
        return error;
    }
}

