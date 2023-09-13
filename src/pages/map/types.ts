
export interface Fiction {
    id: number;
    name: string;
    imgUrl: string;
    scenes: Scene[]
    type: string;
}

  export interface Scene {
    id: number;
    name: string;
    description: string;
    location: {
        latitude: number;
        longitude: number;
    };
    address: string;
}


