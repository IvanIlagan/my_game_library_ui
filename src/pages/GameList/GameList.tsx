import { AddGameButton } from "./AddGameButton.tsx";
import {OwnedGamesService} from "../../services/MyGamesService.ts";
import {useEffect, useState} from "react";
import {GameItem} from "../../interfaces/GameItem.ts";

function GameList() {
    const name: string = localStorage.getItem("ign") || 'Player';
    const [games, setGames] = useState<GameItem[]>([]);

    useEffect(() => {
        let ignore: boolean = false;

        setGames([]);
        if (!ignore) getMyGames();

        return () => {
            ignore = true;
        }
    }, []);

    async function getMyGames() {
        await OwnedGamesService.getMyGames()
            .then(resp => {
                setGames(resp.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const gamesList = games.map((item) => {
        return (
        <div className="" key={item.gb_game_id}>
            <img src={item.image_url} className="w-full h-[92%] object-fill" />
            <div
                className="flex justify-center items-center w-full h-[8%] font-bold text-center bg-[#E1E1E1] p-auto rounded-b-lg overflow-hidden">
                <span className="truncate">{item.name}</span>
            </div>
        </div>
    )
    });

    return (
        <>
            <div className="navbar flex justify-between">
                <div>
                    {name}'s Games
                </div>
                <div>
                    <input type="text" className="border border-black/30 mr-2" placeholder="Search Game List" />
                    <AddGameButton />
                </div>
            </div>

            <div className="list-filter">
                filters here
            </div>

            <div className="games-list grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-[0_5%]">
                {gamesList}
            </div>
        </>
    )
}

export default GameList