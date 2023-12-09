import path from 'path';
import { solveWithLogs } from '../utils/logs';
import { readInput } from '../utils/readFile';
import { Solver } from 'utils/solver';

// --------------
// Problem Inputs
// --------------

type Input = string[];

const testInputRaw = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

export const TEST_INPUT: Input = testInputRaw.split('\n');
export const INPUT: Input = readInput(path.resolve(__dirname, './input.txt')).split('\n');

// -------------------
// Your functions here
// -------------------

const pascalTriangle: number[][] = [[1]];

const getPascalCoefs = (index: number): number[] => {
    for (let i = pascalTriangle.length; i <= index; i++) {
        pascalTriangle[i] = [];
        for (let j = 0; j <= index; j++) {
            pascalTriangle[i].push(
                (pascalTriangle[i - 1][j - 1] ?? 0) + (pascalTriangle[i - 1][j] ?? 0),
            );
        }
    }

    return pascalTriangle[index];
};

const computeNextTerm = (terms: string[]): number => {
    const coefs = getPascalCoefs(terms.length);

    const sign = (-1 * terms.length) % 2 ? 1 : -1;
    let nextTerm = +terms[0] * sign;

    for (let i = 1; i < terms.length; i++) {
        nextTerm += +terms[i] * coefs[i] * (-1) ** i * sign;
    }

    return nextTerm;
};

const computeNextTermSum = (input: Input, backward = false) =>
    input.reduce(
        (sum, line) =>
            line
                ? sum + computeNextTerm(backward ? line.split(' ').reverse() : line.split(' '))
                : sum,
        0,
    );

// -------------
// Solve problem
// -------------

const problem1: Solver = () => computeNextTermSum(INPUT);

const problem2: Solver = () => computeNextTermSum(INPUT, true);

// ---------------
// Display answers
// ---------------

solveWithLogs(problem1, 1);

solveWithLogs(problem2, 2);
