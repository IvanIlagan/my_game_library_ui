import { AddGameButton } from "./AddGameButton.tsx";
import {OwnedGamesService} from "../../services/MyGamesService.ts";
import {useCallback, useEffect, useState} from "react";
import {GameItem} from "../../interfaces/GameItem.ts";
import {useNavigate} from "react-router";

const debounce = (func, delay) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

function GameList() {
    const name: string = localStorage.getItem("ign") || 'Player';
    const [games, setGames] = useState<GameItem[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        let ignore: boolean = false;

        setGames([]);
        if (!ignore) getMyGames();

        return () => {
            ignore = true;
        }
    }, []);

    const handleSearch = useCallback(
        debounce((query: string) => {
            getMyGames({ name: query });
        }, 500),
        []
    );

    async function getMyGames(params = {}) {
        await OwnedGamesService.getMyGames(params)
            .then(resp => {
                setGames(resp.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function onGameClick(game: GameItem) {
        const id: string = game.gb_game_id;
        navigate(`/my_games/${game.name}`, { state: { id } });
    }

    function onSearchInput(event) {
        handleSearch(event.target.value);
    }

    const gamesList = games.map((item) => {
        return (
        <button className="" key={item.gb_game_id} onClick={() => onGameClick(item)}>
            <img src={item.image_url} className="w-full h-[92%] object-fill" />
            <div
                className="flex justify-center items-center w-full h-[8%] font-bold text-center bg-[#E1E1E1] p-auto rounded-b-lg overflow-hidden">
                <span className="truncate">{item.name}</span>
            </div>
        </button>
    )
    });

    return (
        <>
            <div className="navbar flex justify-between items-center mb-6">
                <h1 className="text-6xl bold">{name}'s Games</h1>
                <div className="flex justify-center items-center">
                    <input type="text"
                           className="form-input mt-0 mr-4"
                           placeholder="Search My Game List"
                           onInput={onSearchInput}
                    />
                    <AddGameButton/>
                </div>
            </div>

            <div className="list-filter mb-6">
                filters here
            </div>

            <div className="games-list grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-[0_5%]">
                {gamesList}
            </div>
        </>
    )
}

export default GameList