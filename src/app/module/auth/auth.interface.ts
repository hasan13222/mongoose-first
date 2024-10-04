import { TUserRole } from "../user/user.interface";

export interface TUserLoginDetails {
    id: string;
    password: string;
}

export interface TJwtPayload {
    userId: string;
    role: TUserRole
}