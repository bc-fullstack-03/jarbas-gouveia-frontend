import { ResponseFormat } from "../interfaces/ResponseFormat";
import { IAuth } from "../types/IAuth";
import axiosHandler from "./axios";

export async function login(email: string, password: string): Promise<ResponseFormat<IAuth>> {
    try {
        const { data, status } = await axiosHandler.post("/auth", {
            email,
            password,
        });
        return {
            data,
            status,
        };
    } catch (error) {
        return {
            data: error as IAuth,
            status: 500,
        }
    }
}