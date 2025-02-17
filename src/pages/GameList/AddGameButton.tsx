import * as Dialog from "@radix-ui/react-dialog";
import {useCallback, useState} from "react";
import {GamesDropdown} from "./GamesDropdown.tsx";
import {GameSearch} from "../../services/GameSearchService.ts";
import {GameItem} from "../../interfaces/GameItem.ts";
import {OwnedGamesService} from "../../services/MyGamesService.ts";

const debounce = (func, delay) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

export function AddGameButton({ onAddGame }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [games, setGames] = useState([]);
    const [optionsLoading, setOptionsLoading] = useState(false);
    const [selected, setSelected] = useState<GameItem | null>(null);

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

    async function onAdd(event) {
        event.preventDefault();

        if (selected) {
            await OwnedGamesService.addGame(selected)
                .then(() => {
                    onAddGame(selected);
                    onClose();
                    setModalOpen(false);
                })
                .catch((err) => {
                    console.log(err.response.data.error);
                });
        }
    }

    function onClose() {
        setGames([]);
        setSelected(null);
    }

    return (
        <>
            <Dialog.Root open={modalOpen} onOpenChange={setModalOpen}>
                <Dialog.Trigger asChild>
                    <button className="form-button bg-[rgb(54,217,0)]">Add</button>
                </Dialog.Trigger>


                <Dialog.Portal>
                    <Dialog.Overlay className="modal-overlay" />
                    <Dialog.Content className="modal-container" onCloseAutoFocus={onClose}>
                        <Dialog.Title className="modal-title">
                            <div className="flex justify-between">
                                Add Game

                                <Dialog.Close asChild>
                                    <button
                                        className="inline-flex items-center justify-center
                                            border rounded-[100%]
                                            h-[25px] w-[25px]" aria-label="Close" onClick={onClose}>
                                        X
                                    </button>
                                </Dialog.Close>
                            </div>

                        </Dialog.Title>

                        <hr/>

                        <div className="mb-2 p-6">
                            Search Games
                            <input className="form-input" type="text" placeholder="Search" onInput={onInput} />
                        </div>

                        <hr/>

                        <div>
                            {optionsLoading ?
                                <div className='text-center p-6'>Loading Games...</div> :
                                <GamesDropdown data={games} onSelect={setSelected} />
                            }
                        </div>

                        <hr/>

                        <div className="p-6">
                            Selected
                            {selected ?
                                <div className="flex h-[150px] mb-4 border rounded-2xl">
                                    <div className='icon h-full w-[120px] mr-4'>
                                        <img alt={selected.name} src={selected.image_url}
                                             className='h-full w-full rounded-l-2xl'/>
                                    </div>
                                    <div className='font-bold text-left self-center'>
                                        {selected.name}
                                    </div>
                                </div> :
                                <></>
                            }
                        </div>

                        <hr/>

                        <div className="flex p-6 justify-end">
                            <Dialog.Close asChild>
                                <button className="form-button bg-[rgb(54,217,0)]" onClick={onAdd}>Add</button>
                            </Dialog.Close>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </>
    )
}
