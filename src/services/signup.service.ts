import { ResponseFormat } from "../interfaces/ResponseFormat";
import axiosHandler from "./axios";

export async function signup(username: string, email: string, password: string): Promise<ResponseFormat<string>> {
    try {
        const { data, status } = await axiosHandler.post("/user/new-user", {
            username,
            email,
            password,
        });
        return {
            data,
            status,
        };
    } catch (error) {
        return {
            data: "",
            status: 500,
        }
    }
}