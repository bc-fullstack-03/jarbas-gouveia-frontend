import { ResponseFormat } from "../interfaces/ResponseFormat";
import axiosHandler from "./axios";

export async function addLike(momentId: string) {
    try {
        const { data, status } = await axiosHandler.post(`/${momentId}/like`);

        return {
            data,
            status,
        }

    } catch (error) {
        return error
    }
}

export async function removeLike(momentId: string) {
    try {
        const { data, status } = await axiosHandler.post(`/${momentId}/unlike`);

        return {
            data,
            status,
        }

    } catch (error) {
        return error
    }
}

export async function hasLiked(momentId: string): Promise<ResponseFormat<boolean>> {
    try {
        const { data, status } = await axiosHandler.get(`/${momentId}/has-liked`);

        return {
            data,
            status,
        }

    } catch (error) {
        return {
            data: false,
            status: 500,
        }

    }
}