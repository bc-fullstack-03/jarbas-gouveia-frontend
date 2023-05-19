import axiosHandler from "./axios";

export async function getUserByUserId(token: string, userId: string) {

    try {
        const { data, status } = await axiosHandler.get(`/user/id/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': "Bearer " + `${token}`,
            },
        })

        return {
            data,
            status
        };

    } catch (error) {
        return error;
    }
}