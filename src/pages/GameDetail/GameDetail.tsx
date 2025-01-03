import {useLocation} from "react-router";
import {useEffect, useState} from "react";
import {OwnedGamesService} from "../../services/MyGamesService.ts";
import {OwnedGameDetails} from "../../interfaces/OwnedGameDetails.ts";

export default function GameDetail() {
    const { state } = useLocation();
    const [gameDetail, setGameDetail] = useState<OwnedGameDetails | null>(null);
    const gameId: string = state?.id;

    useEffect(() => {
        let ignore: boolean = false;

        setGameDetail(null);
        if (!ignore) getGame();

        return () => {
            ignore = true;
        }
    }, []);

    async function getGame() {
        await OwnedGamesService.getMyGame(gameId)
            .then(resp => {
                setGameDetail(resp.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <>
            <div className="grid grid-cols-[6fr_2fr] grid-rows-[repeat(1,minmax(600px,600px))] p-6 shadow-[0px_0px_2px_rgb(0,0,0),0px_17px_24px_rgba(0,0,0,0.3)] mb-12">
                <div className="flex h-full overflow-hidden">
                    <img alt={gameDetail?.name} src={gameDetail?.image_url} className='h-full w-[400px] object-fill mr-4'/>
                    <div>
                        <h1 className="text-6xl bold">{gameDetail?.name}</h1>
                        <div>
                            {gameDetail?.description}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-start items-center">
                    <h4 className="text-2xl font-bold">Rating</h4>
                    {gameDetail?.rating} 1
                </div>
            </div>

            <div className="h-[300px] p-6 shadow-[0px_0px_2px_rgb(0,0,0),0px_17px_24px_rgba(0,0,0,0.3)] mb-12">
                <h4 className="text-2xl font-bold">My Review</h4>
                <div>
                    {gameDetail?.review} Test
                </div>
            </div>

            <div className="h-[300px] p-6 shadow-[0px_0px_2px_rgb(0,0,0),0px_17px_24px_rgba(0,0,0,0.3)]">
                <h4 className="text-2xl font-bold">My Play Data</h4>
                <div>
                    Times played: {gameDetail?.times_played}
                </div>
                <div>
                    Game Finished?: {gameDetail?.is_finished ? 'Finished' : 'Not Finished'}
                </div>
            </div>
        </>
    )
}