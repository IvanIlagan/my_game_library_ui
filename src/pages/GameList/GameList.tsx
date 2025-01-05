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

export function sortGames(games: GameItem[], order) {
    return [...games].sort((item1, item2) => {
        let nameCriterion: number = 0;
        let addedDateCriterion: number = 0;

        if (order.name === "asc") {
            nameCriterion = item1.name.localeCompare(item2.name);
        } else {
            nameCriterion = item2.name.localeCompare(item1.name);
        }

        if (order.addedDate === "asc") {
            addedDateCriterion = new Date(item1.created_at).getTime() > new Date(item2.created_at).getTime() ? 1 : -1;
        } else {
            addedDateCriterion = new Date(item2.created_at).getTime() > new Date(item1.created_at).getTime() ? 1 : -1;
        }


        return nameCriterion || addedDateCriterion;
    });
}

function GameList() {
    const name: string = localStorage.getItem("ign") || 'Player';
    const [games, setGames] = useState<GameItem[]>([]);
    const navigate = useNavigate();
    const [orderCriteria, setOrderCriteria] = useState({ name: '', addedDate: "asc" });

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

    function onNameSortClick() {
        const order: string = orderCriteria.name === "asc" ? "desc" : "asc";
        const criteria = {
            name: order,
            addedDate: orderCriteria.addedDate
        };
        setOrderCriteria(criteria);
        setGames(sortGames(games, criteria));
    }

    function onAddedDateSortClick() {
        const order: string = orderCriteria.addedDate === "asc" ? "desc" : "asc";
        const criteria = {
            name: orderCriteria.name,
            addedDate: order
        };
        setOrderCriteria(criteria);
        setGames(sortGames(games, criteria));
    }

    function onAddGame(game: GameItem) {
        setGames(games.concat(game));
    }

    function renderArrowDirection(direction: string) {
        if (direction === "asc") {
            return (
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M7.14645 2.14645C7.34171 1.95118 7.65829 1.95118 7.85355 2.14645L11.8536 6.14645C12.0488 6.34171 12.0488 6.65829 11.8536 6.85355C11.6583 7.04882 11.3417 7.04882 11.1464 6.85355L8 3.70711L8 12.5C8 12.7761 7.77614 13 7.5 13C7.22386 13 7 12.7761 7 12.5L7 3.70711L3.85355 6.85355C3.65829 7.04882 3.34171 7.04882 3.14645 6.85355C2.95118 6.65829 2.95118 6.34171 3.14645 6.14645L7.14645 2.14645Z"
                        fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                    </path>
                </svg>
            );
        } else {
            return (
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M7.5 2C7.77614 2 8 2.22386 8 2.5L8 11.2929L11.1464 8.14645C11.3417 7.95118 11.6583 7.95118 11.8536 8.14645C12.0488 8.34171 12.0488 8.65829 11.8536 8.85355L7.85355 12.8536C7.75979 12.9473 7.63261 13 7.5 13C7.36739 13 7.24021 12.9473 7.14645 12.8536L3.14645 8.85355C2.95118 8.65829 2.95118 8.34171 3.14645 8.14645C3.34171 7.95118 3.65829 7.95118 3.85355 8.14645L7 11.2929L7 2.5C7 2.22386 7.22386 2 7.5 2Z"
                        fill="currentColor" fillRule="evenodd" clipRule="evenodd">

                    </path>
                </svg>
            );
        }
    }

    const gamesList = games.map((item) => {
        return (
            <button className="" key={item.gb_game_id} onClick={() => onGameClick(item)}>
                <img src={item.image_url} className="w-full h-[92%] object-fill"/>
                <div
                    className="flex justify-center items-center w-full h-[8%] font-bold text-center bg-[#E1E1E1] p-auto rounded-b-lg overflow-hidden">
                    <span className="truncate">{item.name}</span>
                </div>
            </button>
        )
    });

    return (
        <>
            <div className="flex justify-between items-center">
                <h1 className="text-6xl bold">{name}'s Games</h1>
            </div>

            <div className="list-filter flex justify-end items-center px-4 mb-6 bg-blue-200">
                <div className="h-[50px] mr-4">
                    <button className="form-button h-full w-[110px] border-l border-black/30 rounded-none text-black" onClick={onNameSortClick}>
                        <div className="flex items-center justify-center">
                            Name
                            {orderCriteria.name ? renderArrowDirection(orderCriteria.name) : <></>}
                        </div>
                    </button>
                    <button className="form-button h-full w-[130px] border-x border-black/30 rounded-none text-black" onClick={onAddedDateSortClick}>
                        <div className="flex items-center justify-center">
                            Added Date
                            {orderCriteria.addedDate ? renderArrowDirection(orderCriteria.addedDate) : <></>}
                        </div>
                    </button>
                </div>
                <div className="flex justify-center items-center">
                    <input type="text"
                           className="form-input mt-0 mr-4"
                           placeholder="Search My Game List"
                           onInput={onSearchInput}
                    />
                    <AddGameButton onAddGame={onAddGame}/>
                </div>
            </div>

            <div
                className="games-list grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-[0_5%]">
                {gamesList}
            </div>
        </>
    )
}

export default GameList