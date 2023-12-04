import path from 'path';
import { solveWithLogs } from '../utils/logs';
import { readInput } from '../utils/readFile';
import { Solver } from 'utils/solver';

// --------------
// Problem Inputs
// --------------

type Input = string[];

const testInputRaw = ``;

export const TEST_INPUT: Input = testInputRaw.split('\n');
export const INPUT: Input = readInput(path.resolve(__dirname, './input.txt')).split('\n');

// -------------------
// Your functions here
// -------------------

const myFunction = (input: Input) => {
    return "This ain't gonna solve itself alone !";
};

// -------------
// Solve problem
// -------------

const problem1: Solver = () => myFunction(TEST_INPUT);

// const problem2: Solver = () => myFunction(TEST_INPUT);

// ---------------
// Display answers
// ---------------

solveWithLogs(problem1, 1);

// solveWithLogs(problem2, 2);
