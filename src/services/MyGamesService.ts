import {V1ApiService} from "./V1ApiService.ts";
import {GameItem} from "../interfaces/GameItem.ts";

class MyGamesService extends V1ApiService {
    constructor() {
        super();
    }

    addGame(game: GameItem) {
        return this.http.post(`${(this.endpoint)}/my_games`, game);
    }
}

export const OwnedGamesService = new MyGamesService();