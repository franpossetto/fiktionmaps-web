export interface City {
    id: number;
    name: string;
    placeId: string;
    latitude: number;
    longitude: number;
    provider: string; // Esto se puede expandir si hay otros proveedores.
    code: string;
    locations: any[]; // Asumiendo que es un arreglo, pero el tipo de ítems dentro del arreglo no está especificado.
}