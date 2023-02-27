import axios from 'axios';
import { MediaType } from '../types/MediaType';

class TMDBService {
    baseUrl: string = "https://api.themoviedb.org/3";
    apiKey: string = import.meta.env.VITE_TMDB_API_KEY;

    async search(movieName: string, type: MediaType): Promise<any>{
        try {
            const response = await axios.get(`${this.baseUrl}/search/${MediaType[type].toLowerCase()}?api_key=${this.apiKey}&query=${movieName}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getEpisodes(season_id: number, season_number: number, episode_number: number): Promise<any>{
        try {
            const response = await axios.get(`${this.baseUrl}/tv/${season_id}/season/${season_number}/episode/${episode_number}?api_key=${this.apiKey}`);
            console.log(response.data)
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getAllEpisodes(season_id: number, season_number: number, number_of_episodes: number): Promise<any>{
        let episode_number = 1;
        let episodes = []
        while( episode_number < number_of_episodes){    
            try {
                const response = await axios.get(`${this.baseUrl}/tv/${season_id}/season/${season_number}/episode/${episode_number}?api_key=${this.apiKey}`)
                const episode = {
                    name: response?.data?.name,
                    display_name:`Episode ${episode_number}: ${response?.data?.name}`,
                    number: response?.data.episode_number,
                    season: response?.data.season_number,
                    id: response?.data.id,
                  };
                episodes.push(episode);
           
            } catch (error: any) {
                if (error.response && error.response.status === 404) {
                    console.log(error);
                    // 404 error - create a default episode object
                    const defaultEpisode = {
                      name: `Episode ${episode_number}`,
                      display_name: `Episode ${episode_number}: No information founded`,
                      number: episode_number,
                      season: season_number,
                      id: episode_number,
                    };
                    episodes.push(defaultEpisode);
                  
                  } else {
                    throw error;
                  }
            } finally {
                episode_number++;
              }
        }
        return episodes;
    }

    async getDetails(id: number, type: MediaType): Promise<any>{
        try {
            const response = await axios.get(`${this.baseUrl}/${MediaType[type].toLowerCase()}/${id}?api_key=${this.apiKey}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }    
}

export default new TMDBService();