export interface Scene {
    // fiction
    id?: number;
    name: string;
    description: string;
    screenShot?: string,
    season: string,
    episodeName: string,
    episodeNumber: string,
    location: {
        id: number;
        latitude: number;
        longitude: number;
        formattedAddress: string;
        placeId: string;
    };
    startAt: number;
    endAt: number;
    segmentType?: any;
    userId: number;
}