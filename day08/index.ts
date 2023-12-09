import path from 'path';
import { solveWithLogs } from '../utils/logs';
import { readInput } from '../utils/readFile';
import { Solver } from 'utils/solver';

// --------------
// Problem Inputs
// --------------

type Input = string[];

const testInputRaw = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)
`;
const testInputRaw2 = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)
`;

export const TEST_INPUT: Input = testInputRaw.split('\n');
export const TEST_INPUT2: Input = testInputRaw2.split('\n');
export const INPUT: Input = readInput(path.resolve(__dirname, './input.txt')).split('\n');

// -------------------
// Your functions here
// -------------------

type Node = {
    L: string;
    R: string;
};

type Nodes = Record<string, Node>;

interface Network {
    directions: string;
    nodes: Nodes;
}

const parseInput = (input: Input): Network => {
    const network: Network = {
        directions: input.shift(),
        nodes: {},
    };

    input.forEach((line) => {
        const matches = /(.+) = \((.+), (.+)\)/.exec(line);
        if (matches?.length === 4) {
            network.nodes[matches[1]] = { L: matches[2], R: matches[3] };
        }
    });

    return network;
};

const countSteps = (start: string, stop: string, network: Network): number => {
    let step = 0;
    let currentPosition = start;

    while (currentPosition !== stop) {
        currentPosition =
            network.nodes[currentPosition][
                network.directions.charAt(step % network.directions.length)
            ];
        step++;
    }

    return step;
};

const problem1Solution = (input: Input) => {
    const network = parseInput(input);

    return countSteps('AAA', 'ZZZ', network);
};

// ------ Part 2 ------

const countGhostStepsBruteForce = (start: string, stop: string, network: Network): number => {
    let step = 0;
    let currentPositions = Object.keys(network.nodes).filter((position) =>
        position.endsWith(start),
    );

    console.log({ currentPositions });

    while (!currentPositions.every((position) => position.endsWith(stop))) {
        const nextDirection = network.directions.charAt(step % network.directions.length);
        currentPositions = currentPositions.map(
            (currentPosition) => network.nodes[currentPosition][nextDirection],
        );
        step++;

        if (step % 1000000 === 0) console.log({ step, currentPositions });
    }

    return step;
};

const countGhostStepsOptimized = (start: string, stop: string, network: Network): number => {
    const step = 0;
    const currentPositions = Object.keys(network.nodes).filter((position) =>
        position.endsWith(start),
    );

    // console.log({ currentPositions });

    // while (!currentPositions.every((position) => position.endsWith(stop))) {
    //     const nextDirection = network.directions.charAt(step % network.directions.length);
    //     currentPositions = currentPositions.map(
    //         (currentPosition) => network.nodes[currentPosition][nextDirection],
    //     );
    //     step++;

    //     if (step % 1000000 === 0) console.log({ step, currentPositions });
    // }

    return step;
};

const problem2Solution = (input: Input) => {
    const network = parseInput(input);

    return countGhostStepsOptimized('A', 'Z', network);
};

// -------------
// Solve problem
// -------------

const problem1: Solver = () => problem1Solution(INPUT);

const problem2: Solver = () => problem2Solution(TEST_INPUT2);

// ---------------
// Display answers
// ---------------

// solveWithLogs(problem1, 1);

solveWithLogs(problem2, 2);

// Brute force...  failed to find final position afer a little too many steps
// {
//     step: 165101000000,
//     currentPositions: [ 'SLK', 'CTN', 'XCX', 'HCH', 'NQV', 'RKD' ]
// }
// Must find an optimized solution :thinking:
