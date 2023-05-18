import { MomentFornData } from "../types/MomentFormData";
import axiosHandler from "./axios";

export async function getMomentById(token: string, id: string) {
    const { data } = await axiosHandler.get(`${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': "Bearer " + `${token}`,
        },
    });

    return data;
}

export async function createMoment(token: string, request: MomentFornData) {
    const formData = new FormData();
    formData.append('title', request.title);
    formData.append('caption', request.caption);
    formData.append('photo', request.photo);

    const { data, status } = await axiosHandler.post(`/new-moment`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': "Bearer " + `${token}`,
        },
    });

    return {
        data,
        status
    };
}