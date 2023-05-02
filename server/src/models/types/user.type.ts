import { Document } from 'mongoose' 

export type UserRoleType = 'admin' | 'staff' | 'guest'

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    age: number;
    phone_number: string;
    role?: UserRoleType;
    is_active?: boolean;
}

export interface IUserUpdate {
    username?: string;
    email?: string;
    password?: string;
    first_name?: string;
    last_name?: string;
    age?: number;
    phone_number?: string;
    role?: UserRoleType;
    is_active?: boolean;
}

export interface IUserLogin {
    username: string;
    password: string;
}