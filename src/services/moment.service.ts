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