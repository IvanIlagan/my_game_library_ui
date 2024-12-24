

function GameList() {
    return (
        <>
            <div className="navbar flex justify-between">
                <div>
                    My Game List
                </div>
                <div>
                    <input type="text" className="border border-black/30 mr-2" placeholder="Search Game List" />
                    <button className="border border-black/30 p-1">Add</button>
                </div>
            </div>

            <div className="list-filter">
                filters here
            </div>

            <div className="games-list grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                <div>
                    Game 1
                </div>

                <div>
                    Game 2
                </div>

                <div>
                    Game 3
                </div>

                <div>
                    Game 4
                </div>

                <div>
                    Game 5
                </div>

                <div>
                    Game 6
                </div>

                <div>
                    Game 7
                </div>
            </div>
        </>
    )
}

export default GameList