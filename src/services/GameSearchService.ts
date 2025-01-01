import {V1ApiService} from "./V1ApiService.ts";

class GameSearchService extends V1ApiService {
    constructor() {
        super();
    }

    search(name: string) {
        return this.http.get(`${(this.endpoint)}/games`, { params: { name } });
    }
}

export const GameSearch = new GameSearchService();