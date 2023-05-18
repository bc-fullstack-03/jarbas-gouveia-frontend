import axiosHandler from "./axios";

export async function getProfile(token: string, user: string) {
    try {
        const { data } = await axiosHandler.get(`/profile/${user}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': "Bearer " + `${token}`,
            },
        });

        return data;

    } catch (error) {
        return error;
    }
}

export async function getProfileByUserId(token: string, userId: string) {

    try {
        const { data, status } = await axiosHandler.get(`/profile/userId/${userId}`, {
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

