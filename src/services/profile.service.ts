import { Profile } from "../interfaces/IProfile";
import { ResponseFormat } from "../interfaces/ResponseFormat";
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

export async function getProfileByUserId(token: string, userId: string): Promise<ResponseFormat<Profile>> {

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
        return {
            data: {} as Profile,
            status: 500,
        }
    }
}

