import path from 'path';
import { solveWithLogs } from '../../utils/logs';
import { readInput } from '../../utils/readFile';
import { Solver } from 'utils/solver';

// --------------
// Problem Inputs
// --------------

type Input = string[];

const testInputRaw = `+1
-2
+3
+1`;

export const TEST_INPUT: Input = testInputRaw.split('\n');
export const INPUT: Input = readInput(path.resolve(__dirname, './input.txt')).split('\n');

// -------------------
// Your functions here
// -------------------

// Cas 1: Reduce
const myFunctionReduce = (input: Input) =>
    input.reduce((freq, change) => freq + parseInt(change, 10), 0);

// Cas 2: For of
const myFunctionFor = (input: Input) => {
    let frequency = 0;

    for (const change of input) {
        frequency += parseInt(change, 10);
    }

    return frequency;
};

// 2nd part
const secondFunction = (input: Input) => {
    // sauvegarder à chaque passage le résultat des additions (Set)
    // à chaque passage, vérifier que la nouvelle valeur n'est pas dans le Set
    let i = 0;
    let frequency = 0;
    const seen = new Set();

    while (true) {
        const change = parseInt(input[i % input.length], 10);
        frequency += change;
        if (seen.has(frequency)) return frequency;
        seen.add(frequency);
        i++;
    }
};

// -------------
// Solve problem
// -------------

// const problem1: Solver = () => myFunctionReduce(INPUT);

const problem2: Solver = () => secondFunction(INPUT);

// ---------------
// Display answers
// ---------------

// solveWithLogs(problem1, 1);

solveWithLogs(problem2, 2);
