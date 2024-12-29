import * as Dialog from "@radix-ui/react-dialog";

export function AddGameButton() {

    return (
        <>
            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <button className="border border-black/30 p-1">Add</button>
                </Dialog.Trigger>


                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black/30" />
                    <Dialog.Content className="fixed top-1/2 left-1/2 bg-white rounded-[6px] -translate-x-1/2 -translate-y-1/2">
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

                        <Dialog.Description className="DialogDescription p-6">
                            Search Games: <input className="border border-black/30" type="text" placeholder="Search"/>
                        </Dialog.Description>

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
