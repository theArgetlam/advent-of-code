import path from 'path';
import { solveWithLogs } from '../utils/logs';
import { readInput } from '../utils/readFile';
import { Solver } from 'utils/solver';

// --------------
// Problem Inputs
// --------------

type Input = string[];

const testInputRaw = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
`;

export const TEST_INPUT: Input = testInputRaw.split('\n');
export const INPUT: Input = readInput(path.resolve(__dirname, './input.txt')).split('\n');

// -------------------
// Your functions here
// -------------------

interface Set {
    blue: number;
    green: number;
    red: number;
}

interface Game {
    id: number;
    sets: Set[];
}

const parseSet = (setRaw: string): Set => {
    const set = {
        blue: 0,
        green: 0,
        red: 0,
    };

    setRaw.split(', ').forEach((pull) => {
        const [count, color] = pull.trim().split(' ');
        set[color] = +count;
    });

    return set;
};

const parseGame = (line: string): Game => {
    const [gameIdRaw, setsRaw] = line.replace('Game ', '').split(':');
    const game: Game = {
        id: +gameIdRaw,
        sets: [],
    };

    game.sets = setsRaw.split(';').map(parseSet);

    return game;
};

const isPossibleGame = (game: Game, fullSet: Set): boolean =>
    game.sets.every(
        (set) => set.blue <= fullSet.blue && set.green <= fullSet.green && set.red <= fullSet.red,
    );

const possibleGamesIdsSum = (input: Input) =>
    input.reduce((acc, line) => {
        if (!line) return acc;

        const game = parseGame(line);

        return isPossibleGame(game, { blue: 14, green: 13, red: 12 }) ? acc + game.id : acc;
    }, 0);

// Part 2

const getMinimumSet = (game: Game): Set => {
    const minSet = {
        blue: 0,
        green: 0,
        red: 0,
    };

    game.sets.forEach(({ blue, green, red }) => {
        minSet.blue = Math.max(minSet.blue, blue);
        minSet.green = Math.max(minSet.green, green);
        minSet.red = Math.max(minSet.red, red);
    });

    return minSet;
};

const computePowersSum = (input: Input): number =>
    input.reduce((acc, line) => {
        if (!line) return acc;

        const minimumSet = getMinimumSet(parseGame(line));

        return acc + minimumSet.blue * minimumSet.green * minimumSet.red;
    }, 0);

// -------------
// Solve problem
// -------------

const problem1: Solver = () => possibleGamesIdsSum(INPUT);

const problem2: Solver = () => computePowersSum(INPUT);

// ---------------
// Display answers
// ---------------

// solveWithLogs(problem1, 1);
// 2512 -> Yeah !

solveWithLogs(problem2, 2);
// 67335 -> Yeah !
