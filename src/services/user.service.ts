import { IUser } from "../interfaces/IUser";
import { ResponseFormat } from "../interfaces/ResponseFormat";
import axiosHandler from "./axios";

export async function getUserByUserId(token: string, userId: string) {
    try {
        const { data, status } = await axiosHandler.get(`/user/id/${userId}`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + `${token}`,
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

export async function getUserNotFollowed(token: string): Promise<ResponseFormat<IUser[]>> {
    try {
        const { data, status } = await axiosHandler.get(`/user/explore`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + `${token}`,
            },
        });

        return {
            data,
            status,
        };
    } catch (error) {
        return {
            data: [],
            status: 500,
        };
    }
}

export async function follow(token: string, userName: string): Promise<ResponseFormat<string>> {
    try {
        const { data, status } = await axiosHandler.post(`/user/${userName}/follow`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'Authorization': "Bearer " + `${token}`,

            },
        });

        return {
            data,
            status,
        }
    } catch (error) {
        return {
            data: "",
            status: 500,
        };
    }
}


