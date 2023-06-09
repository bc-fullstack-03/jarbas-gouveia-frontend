import { IUser } from "./IUser";

export interface IProfile {
    id: string;
    userId: string;
    user: IUser;
    name: string;
    username: string;
    profilePicture: string;
    bio: string;
    location: string;
    website: string;
    birthday: string;
}