import {describe, expect, it} from 'vitest'
import { sortGames } from "../pages/GameList";
import {GameItem} from "../interfaces/GameItem.ts";

describe("Calling .sortGames", () => {
    describe("when no order criteria given", () => {
        it("sorts the games list by desc order by default on both name and addedDate attirbutes", () => {
            const criteria = {
                name: '',
                addedDate: ''
            }

            const sortedGames = sortGames([
                {name: "Game 1", created_at: new Date()} as GameItem,
                {name: "Game 2", created_at: new Date("Dec 25 2024")} as GameItem,
            ], criteria);

            expect(sortedGames[0].name).toBe("Game 2");
            expect(sortedGames[1].name).toBe("Game 1");
        });
    });

    describe("when order criteria given", () => {
        describe("when name is set to asc while addedDate is blank", () => {
            it("sorts the games list by asc order by name", () => {
                const criteria = {
                    name: 'asc',
                    addedDate: ''
                }

                const sortedGames = sortGames([
                    {name: "Game 1", created_at: new Date()} as GameItem,
                    {name: "Game 2", created_at: new Date("Dec 25 2024")} as GameItem,
                ], criteria);

                expect(sortedGames[0].name).toBe("Game 1");
                expect(sortedGames[1].name).toBe("Game 2");
            });
        });

        describe("when name is blank but addedDate is asc", () => {
           describe("when the games have different names", () => {
               it("sorts the games list by desc order by name. addedDate sorting will not affect anything", () => {
                   const criteria = {
                       name: '',
                       addedDate: 'asc'
                   }

                   const dateToday = new Date();

                   const sortedGames = sortGames([
                       {name: "Game 1", created_at: dateToday} as GameItem,
                       {name: "My Game", created_at: new Date("Dec 25 2026")} as GameItem,
                       {name: "Game 2", created_at: new Date("Dec 25 2024")} as GameItem,
                   ], criteria);

                   expect(sortedGames[0].name).toBe("My Game");
                   expect(sortedGames[1].name).toBe("Game 2");
                   expect(sortedGames[2].name).toBe("Game 1");
               });
           });

           describe("when some of the games have the very same name", () => {
               it("sorts the games list by desc order by name then the same named games are sorted by addedDate", () => {
                   const criteria = {
                       name: '',
                       addedDate: 'asc'
                   }

                   const dateToday = new Date();

                   const sortedGames = sortGames([
                       {name: "Game 1", created_at: dateToday} as GameItem,
                       {name: "My Game", created_at: dateToday} as GameItem,
                       {name: "My Game", created_at: new Date("Dec 25 2024")} as GameItem,
                       {name: "Game 2", created_at: new Date("Dec 25 2024")} as GameItem,
                   ], criteria);

                   expect(sortedGames[0].name).toBe("My Game");
                   expect(sortedGames[0].created_at).toStrictEqual(new Date("Dec 25 2024"));
                   expect(sortedGames[1].name).toBe("My Game");
                   expect(sortedGames[1].created_at).toStrictEqual(dateToday);
                   expect(sortedGames[2].name).toBe("Game 2");
                   expect(sortedGames[3].name).toBe("Game 1");
               });
           });
        });
    });
});