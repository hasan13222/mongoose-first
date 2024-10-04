import { USER_ROLE } from "./user.constants";

export interface TUser {
    id: string;
    email: string;
    password: string;
    needsPasswordChange?: boolean;
    passwordChangedAt?: string;
    role: 'admin' | 'student' | 'teacher';
    status: 'active' | 'blocked';
    isDeleted: boolean;
}

export type TUserRole = keyof typeof USER_ROLE;