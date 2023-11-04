export interface UserDTO {
    id?: string;
    externalUserId?: string;
    name: string;
    email: string;
    password?: string;
    role?: UserRole;
    country: string;
}

export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
}