export interface User {
    id?: number;
    name: string;
    createdAt: string;
    email?: string,
    externalUserId: number,
    country: string,
    emailVerified: string,
    imageUrl: string,
    handle: string
}