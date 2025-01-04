import {useLocation} from "react-router";
import {useEffect, useRef, useState} from "react";
import {OwnedGamesService} from "../../services/MyGamesService.ts";
import {OwnedGameDetails} from "../../interfaces/OwnedGameDetails.ts";
import {RemoveGameButton} from "./RemoveGameButton.tsx";

export default function GameDetail() {
    const { state } = useLocation();
    const [gameDetail, setGameDetail] = useState<OwnedGameDetails | null>(null);
    const [isEditingReview, setIsEditingReview] = useState(false);
    const [isEditingPlayData, setIsEditingPlayData] = useState(false);
    const [isEditingRating, setIsEditingRating] = useState(false);
    const [isReviewSaving, setIsReviewSaving] = useState(false);
    const [isPlayDataSaving, setIsPlayDataSaving] = useState(false);
    const [isRatingSaving, setIsRatingSaving] = useState(false);

    const reviewRef = useRef<HTMLTextAreaElement>(null);
    const timesPlayedRef = useRef<HTMLInputElement>(null);
    const isFinishedRef = useRef<HTMLInputElement>(null);
    const ratingRef = useRef<HTMLInputElement>(null);
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

    async function onReviewSave() {
        if (!isEditingReview) return;
        if (gameDetail && reviewRef.current) {
            setIsReviewSaving(true);
            const textAreaValue: string = reviewRef.current.value;
            await OwnedGamesService.updateMyGame(gameId, { review: reviewRef.current.value })
                .then(() => {
                    gameDetail.review = textAreaValue;
                    setGameDetail(gameDetail);
                    setIsEditingReview(false);
                })
                .catch(err => {
                    console.log(err)
                })
                .finally(() => setIsReviewSaving(false));
        }
    }

    async function onPlayDataSave() {
        if (!isEditingPlayData) return;
        if (gameDetail && timesPlayedRef.current && isFinishedRef.current) {
            setIsPlayDataSaving(true);
            const updatedData = {
                times_played: timesPlayedRef.current.value,
                is_finished: isFinishedRef.current.checked
            }

            await OwnedGamesService.updateMyGame(gameId, updatedData)
                .then(() => {
                    gameDetail.times_played = +updatedData.times_played;
                    gameDetail.is_finished = updatedData.is_finished;
                    setGameDetail(gameDetail);
                    setIsEditingPlayData(false);
                })
                .catch(err => {
                    console.log(err)
                })
                .finally(() => setIsPlayDataSaving(false));
        }
    }

    async function onRatingSave() {
        if (!isEditingRating) return;
        if (gameDetail && ratingRef.current) {
            setIsRatingSaving(true);
            const ratingValue = +ratingRef.current.value;
            await OwnedGamesService.updateMyGame(gameId, { rating: ratingValue })
                .then(() => {
                    gameDetail.rating = ratingValue;
                    setGameDetail(gameDetail);
                    setIsEditingRating(false);
                })
                .catch(err => {
                    console.log(err)
                })
                .finally(() => setIsRatingSaving(false));
        }
    }

    function onReviewButtonClick() {
        if (!isEditingReview) {
            // Turn to edit mode
            setIsEditingReview(true);
        } else {
            onReviewSave();
        }
    }

    function onPlayDataButtonClick() {
        if (!isEditingPlayData) {
            setIsEditingPlayData(true);
        } else {
            onPlayDataSave();
        }
    }

    function onRatingButtonClick() {
        if (!isEditingRating) {
            setIsEditingRating(true);
        } else {
            onRatingSave();
        }
    }

    if (!gameDetail) return <></>;

    return (
        <>
            <div className="grid grid-cols-[6fr_2fr] grid-rows-[repeat(1,minmax(600px,600px))] p-6 shadow-[0px_0px_2px_rgb(0,0,0),0px_17px_24px_rgba(0,0,0,0.3)] mb-12">
                <div className="flex h-full overflow-hidden">
                    <img alt={gameDetail.name} src={gameDetail.image_url} className='h-full w-[400px] object-fill mr-4'/>
                    <div>
                        <h1 className="text-6xl bold">{gameDetail.name}</h1>
                        <div>
                            {gameDetail.description}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-between items-center">
                    <h4 className="text-2xl font-bold">Rating</h4>
                    {isEditingRating ?
                        <input type="number" className="form-input w-[100px] mt-0" defaultValue={gameDetail.rating} ref={ratingRef} /> :
                        <>{gameDetail.rating ? gameDetail.rating : 'No Rating Yet'}</>
                    }

                    <button className="form-button bg-[rgb(54,217,0)] float-right" onClick={onRatingButtonClick} disabled={isRatingSaving}>
                        {isEditingRating ? 'Save' : 'Edit'}
                    </button>
                </div>
            </div>

            <div className="h-[300px] p-6 shadow-[0px_0px_2px_rgb(0,0,0),0px_17px_24px_rgba(0,0,0,0.3)] mb-12">
                <div className="flex justify-between items-center">
                    <h4 className="text-2xl font-bold">My Review</h4>
                    <button className="form-button bg-[rgb(54,217,0)] float-right" onClick={onReviewButtonClick} disabled={isReviewSaving}>
                        {isEditingReview ? 'Save' : 'Edit'}
                    </button>
                </div>
                <div>
                    {isEditingReview ?
                        <textarea className="h-full w-full border border-black"
                                  defaultValue={gameDetail.review}
                                  ref={reviewRef}
                                  placeholder={"Add Review"}>
                        </textarea> :
                        <>{gameDetail.review ? gameDetail.review : 'No Review Yet'}</>
                    }
                </div>
            </div>

            <div className="h-[300px] p-6 shadow-[0px_0px_2px_rgb(0,0,0),0px_17px_24px_rgba(0,0,0,0.3)] mb-12">
                <div className="flex justify-between items-center">
                    <h4 className="text-2xl font-bold">My Play Data</h4>
                    <button className="form-button bg-[rgb(54,217,0)] float-right" onClick={onPlayDataButtonClick} disabled={isPlayDataSaving}>
                        {isEditingPlayData ? 'Save' : 'Edit'}
                    </button>
                </div>

                {isEditingPlayData ?
                    <>
                        <div className="flex items-center mb-4">
                            Times played <input className="form-input w-[100px] mt-0 ml-4" type="number" ref={timesPlayedRef}
                                                defaultValue={gameDetail.times_played}/>
                        </div>
                        <div className="flex items-center">
                            Game Finished? <input className="ml-4 h-[20px] w-[20px]" type="checkbox" ref={isFinishedRef}
                                                  defaultChecked={gameDetail.is_finished}/>
                        </div>
                    </> :
                    <>
                        <div>
                            Times played: {gameDetail.times_played}
                        </div>
                        <div>
                            Game Finished?: {gameDetail.is_finished ? 'Finished' : 'Not Finished'}
                        </div>
                    </>
                }
            </div>

            <div className="float-right mb-12">
                <RemoveGameButton gameId={gameId} gameName={gameDetail.name}/>
            </div>
        </>
    )
}