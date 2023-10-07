export interface Scene {
    // fiction
    id: number;
    name: string;
    description: string;
    location: {
        // id
        latitude: number;
        longitude: number;
        formatted_address: string;
    };
}