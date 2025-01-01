import * as Dialog from "@radix-ui/react-dialog";
import {useCallback, useState} from "react";
import {GamesDropdown} from "./GamesDropdown.tsx";
import {GameSearch} from "../../services/GameSearchService.ts";

const debounce = (func, delay) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

export function AddGameButton() {
    const [games, setGames] = useState([]);
    const [optionsLoading, setOptionsLoading] = useState(false);

    const handleSearch = useCallback(
        debounce((query: string) => {
            setOptionsLoading(true);
            searchGames(query);
        }, 500),
        []
    );

    async function searchGames(name: string) {
        await GameSearch.search(name)
            .then(response => {
                setGames(response.data);
            })
            .catch((err) => {
                // below only works when error response returns data
                // else just get the err object and use data in that
                setGames([]);
                console.log(err.response.data.error);
            }).finally(() => setOptionsLoading(false));
    }

    function onInput(event) {
        handleSearch(event.target.value);
    }

    return (
        <>
            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <button className="border border-black/30 p-1">Add</button>
                </Dialog.Trigger>


                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black/30" />
                    <Dialog.Content className="fixed w-[500px] top-1/2 left-1/2 bg-white rounded-[6px] -translate-x-1/2 -translate-y-1/2">
                        <Dialog.Title className="m-0 font-medium text-lg p-6">
                            <div className="flex justify-between">
                                Add Game

                                <Dialog.Close asChild>
                                    <button className="inline-flex items-center justify-center border rounded-[100%] h-[25px] w-[25px]" aria-label="Close">
                                        X
                                    </button>
                                </Dialog.Close>
                            </div>

                        </Dialog.Title>

                        <hr/>

                        <div className="mb-2 p-6">
                            Search Games: <input className="border border-black/30" type="text" placeholder="Search" onInput={onInput} />
                        </div>

                        <div>
                            {optionsLoading ?
                                <div className='text-center p-6'>Loading Games...</div> :
                                <GamesDropdown data={games} onClick={() => {}} />
                            }
                        </div>

                        <hr/>

                        <div className="flex p-6 justify-end">
                            <Dialog.Close asChild>
                                <button className="border border-black/30 p-1">Add</button>
                            </Dialog.Close>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </>
    )
}
