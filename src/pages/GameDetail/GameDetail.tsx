export default function GameDetail() {
    return (
        <>
            <div
                className="rounded-3xl h-[600px] p-6 shadow-[0px_0px_2px_rgb(0,0,0),0px_17px_24px_rgba(0,0,0,0.3)] mb-12">
                <div className="grid grid-cols-3">
                    <div>
                        Game Pic Here
                    </div>
                    <div>
                        <h1 className="text-6xl">Game Title</h1>
                        <div>
                            game metadata here
                        </div>
                    </div>
                    <div>
                        Rating here
                    </div>
                </div>
            </div>

            <div className="rounded-3xl h-[300px] p-6 shadow-[0px_0px_2px_rgb(0,0,0),0px_17px_24px_rgba(0,0,0,0.3)] mb-12">
                <div>
                    Review Here
                </div>
            </div>

            <div className="rounded-3xl h-[300px] p-6 shadow-[0px_0px_2px_rgb(0,0,0),0px_17px_24px_rgba(0,0,0,0.3)]">
                <div>
                    Gamer related stats here
                </div>
            </div>
        </>
    )
}