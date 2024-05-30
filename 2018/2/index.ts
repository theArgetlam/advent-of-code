import path from 'path';
import { solveWithLogs } from '../../utils/logs';
import { readInput } from '../../utils/readFile';
import { Solver } from 'utils/solver';

// --------------
// Problem Inputs
// --------------

type Input = string[];

const testInputRaw = `abcdef
bababc
abbcde
abcccd
aabcdd
abcdee
ababab
`;

export const TEST_INPUT: Input = testInputRaw.split('\n');
export const INPUT: Input = readInput(path.resolve(__dirname, './input.txt')).split('\n');

// -------------------
// Your functions here
// -------------------

const myFunction = (input: Input) => {
    let pairs = 0;
    let trios = 0;

    for (const id of input) {
        const map = {};

        for (const letter of id.split('')) {
            map[letter] = (map[letter] ?? 0) + 1;
        }

        if (Object.values(map).some((v) => v === 2)) {
            pairs++;
        }
        if (Object.values(map).some((v) => v === 3)) {
            trios++;
        }
    }

    return pairs * trios;
};

// -------------
// Solve problem
// -------------

const problem1: Solver = () => myFunction(INPUT);

// const problem2: Solver = () => myFunction(TEST_INPUT);

// ---------------
// Display answers
// ---------------

solveWithLogs(problem1, 1);

// solveWithLogs(problem2, 2);
