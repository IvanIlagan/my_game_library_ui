import {V1ApiService} from "./V1ApiService.ts";
import {GameItem} from "../interfaces/GameItem.ts";

class MyGamesService extends V1ApiService {
    constructor() {
        super();
    }

    addGame(game: GameItem) {
        return this.http.post(`${(this.endpoint)}/my_games`, game);
    }

    getMyGames(params = {}) {
        return this.http.get(`${(this.endpoint)}/my_games`, { params });
    }

    getMyGame(gameId: string) {
        return this.http.get(`${(this.endpoint)}/my_games/${gameId}`);
    }

    updateMyGame(gameId: string, gameDetail) {
        return this.http.put(`${(this.endpoint)}/my_games/${gameId}`, gameDetail);
    }

    deleteMyGame(gameId: string) {
        return this.http.delete(`${(this.endpoint)}/my_games/${gameId}`);
    }
}

export const OwnedGamesService = new MyGamesService();