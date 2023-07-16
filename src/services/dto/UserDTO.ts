export interface UserDTO {
    id?: string;
    externalUserId: string;
    name: string;
    email: string;
    password?: string;
    role: UserRole;
}

export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
}