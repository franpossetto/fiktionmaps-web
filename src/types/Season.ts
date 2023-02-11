export interface Season {
    number_of_seasons: number;
    seasons: TVSeason[];
  }

  export interface TVSeason {
    title: string;
    id: number,
    season_number: number;
    episodes: number
  }

  export interface TVEpisode {
    title: string,
    id: number,
    duration: number
  }