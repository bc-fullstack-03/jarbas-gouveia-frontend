import { IComment } from "../interfaces/IComment";
import { ICommentResponse } from "../interfaces/ICommentReponse";
import { ResponseFormat } from "../interfaces/ResponseFormat";
import axiosHandler from "./axios";

export async function createComment(momentId: string, comment: IComment): Promise<ResponseFormat<ICommentResponse>> {


    try {
        const formData = new FormData();
        formData.append('content', comment.content);

        const { data, status } = await axiosHandler.post(`/${momentId}/comment`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
            },
        });

        return {
            data,
            status
        };
    } catch (error) {
        return {
            data: {} as ICommentResponse,
            status: 500,
        }
    }
}