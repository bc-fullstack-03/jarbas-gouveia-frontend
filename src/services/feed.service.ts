import { Moment } from "../interfaces/IMoment";
import { ResponseFormat } from "../interfaces/ResponseFormat";
import axiosHandler from "./axios";

export async function getMomentsFeed(token: string, page: number, pageLimit: number): Promise<ResponseFormat<Moment[]>> {
    try {
        const { data, status } = await axiosHandler.get(`/feed/page/${page}/pageSize/${pageLimit}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': "Bearer " + `${token}`,
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
        }
    }
}

