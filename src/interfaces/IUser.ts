export interface IUser {
    id: string,
    username: string;
    email: string;
    role: string;
    followers: Array<string>;
    following: Array<string>;
    moments: Array<string>;
}