import { GameItem } from "../../interfaces/GameItem.ts";

export function GamesDropdown({ data , onClick }) {
    const games: GameItem[] = data;

    // NEXT:
    // TODO: Implement on select behavior then create my game entry
    // idea: selectedGame useState at parent then in this component
    // just pass the game data as params to the onClick function from parent
    // parent onClick just setSelected Game on given param

    const list = games.map((game: GameItem, index) => {
        return (
            <li key={index} className='h-[150px] mb-4 border rounded-2xl'>
                <button className='flex h-full w-full'>
                    <div className='icon h-full w-[120px] mr-4'>
                        <img alt={game.name} src={game.imageUrl} className='h-full w-full rounded-l-2xl'/>
                    </div>
                    <div className='font-bold text-left self-center'>
                        {game.name}
                    </div>
                </button>
            </li>
        );
    });

    if (games.length) {
        return (
            <div className="max-h-[300px] overflow-y-auto p-6">
                <ul>{list}</ul>
            </div>
        )
    } else {
        return '';
    }
}