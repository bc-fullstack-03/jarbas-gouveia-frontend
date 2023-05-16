import axiosHandler from "./axios";

export async function login(email: string, password: string) {
    try {
        const { data } = await axiosHandler.post("/auth", {
            email,
            password,
        });
        return data;
    } catch (error) {
        return error;
    }
}