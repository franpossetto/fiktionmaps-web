export interface FictionDTO {
    name: string;
    type: Type;
    provider: Provider
}

enum Type {
    MOVIE, TV_SHOW, BOOK, SONG
}
enum Provider {
    OMDB_API, TVDB_API, CUSTOM
}