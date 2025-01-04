import * as Dialog from "@radix-ui/react-dialog";
import {OwnedGamesService} from "../../services/MyGamesService.ts";
import {useNavigate} from "react-router";
import {useState} from "react";

export function RemoveGameButton({ gameId, gameName }) {
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();

    async function onDelete(event) {
        event.preventDefault();
        setModalOpen(false);

        await OwnedGamesService.deleteMyGame(gameId)
            .then(() => {
                setModalOpen(false);
                navigate('/');
            })
            .catch(err => console.log(err));
    }

    return (
        <Dialog.Root open={modalOpen} onOpenChange={setModalOpen}>
            <Dialog.Trigger asChild>
                <button className="form-button bg-red-500">Remove Game</button>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="modal-overlay" />
                <Dialog.Content className="modal-container">
                    <Dialog.Title className="modal-title">
                        <div className="flex justify-between">
                            Remove Game

                            <Dialog.Close asChild>
                                <button
                                    className="inline-flex items-center justify-center
                                            border rounded-[100%]
                                            h-[25px] w-[25px]" aria-label="Close">
                                    X
                                </button>
                            </Dialog.Close>
                        </div>

                    </Dialog.Title>

                    <hr/>

                    <Dialog.Description className="p-6">
                        Would you like to remove the game <b>{gameName}</b>?
                    </Dialog.Description>

                    <hr/>

                    <div className="flex p-6 justify-end">
                        <Dialog.Close asChild className="mr-2">
                            <button className="form-button border text-black">Cancel</button>
                        </Dialog.Close>
                        <Dialog.Close asChild>
                            <button className="form-button bg-red-500" onClick={onDelete}>Remove</button>
                        </Dialog.Close>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}