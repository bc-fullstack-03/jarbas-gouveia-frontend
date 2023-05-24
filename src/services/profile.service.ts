import { IProfile } from "../interfaces/IProfile";
import { IUpdateProfile } from "../interfaces/IUpdateProfile";
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

export async function getProfileByUserId(token: string, userId: string): Promise<ResponseFormat<IProfile>> {

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
            data: {} as IProfile,
            status: 500,
        }
    }
}

export async function updateProfile(token: string, request: IUpdateProfile): Promise<ResponseFormat<IUpdateProfile>> {
    const formData = new FormData();
    formData.append('name', request.name);
    formData.append('bio', request.bio);
    formData.append('location', request.location);
    formData.append('website', request.website);
    formData.append('birthday', request.birthday);
    formData.append("image", request.image);


    try {
        const { data, status } = await axiosHandler.patch(`/profile`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': "Bearer " + `${token}`,
            },
        });

        return {
            data,
            status
        }
    } catch (error) {
        return {
            data: {} as IUpdateProfile,
            status: 500,
        }
    }
}

