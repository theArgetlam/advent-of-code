import path from 'path';
import { solveWithLogs } from '../utils/logs';
import { readInput } from '../utils/readFile';
import { Solver } from 'utils/solver';

// --------------
// Problem Inputs
// --------------

type Input = string[];

const testInputRaw = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

export const TEST_INPUT: Input = testInputRaw.split('\n');
export const INPUT: Input = readInput(path.resolve(__dirname, './input.txt')).split('\n');

// -------------------
// Your functions here
// -------------------

// Is any symbol exept for '.' and digit
const isSymbol = (char: string) => /[^\d.]/.test(char);

const partNumberSum = (input: Input): number => {
    let sum = 0;

    // Run through every location
    for (let I = 0; I <= input.length - 1; I++) {
        for (let J = 0; J <= input[I].length - 1; J++) {
            if (/\d/.test(input[I][J])) {
                let currentNumber = '';
                let isPartNumber = false;

                do {
                    // Add digit to number
                    currentNumber += input[I][J];
                    // Check for neighbours
                    for (
                        let i = Math.max(0, I - 1);
                        !isPartNumber && i <= Math.min(input.length - 1, I + 1);
                        i++
                    ) {
                        for (
                            let j = Math.max(0, J - 1);
                            !isPartNumber && j <= Math.min(input[i].length - 1, J + 1);
                            j++
                        ) {
                            isPartNumber = isSymbol(input[i][j]);
                        }
                    }
                    J++;
                } while (J < input[I].length && /\d/.test(input[I][J]));

                if (isPartNumber) {
                    sum += +currentNumber;
                }
            }
        }
    }

    return sum;
};

const gearSum = (input: Input): number => {
    // Gears map
    const gears: Record<string, number[]> = {};

    // Run through every location
    for (let I = 0; I <= input.length - 1; I++) {
        for (let J = 0; J <= input[I].length - 1; J++) {
            if (/\d/.test(input[I][J])) {
                let currentNumber = '';
                const starLocations = new Set<string>();

                do {
                    // Add digit to number
                    currentNumber += input[I][J];
                    // Check for neighbours
                    for (let i = Math.max(0, I - 1); i <= Math.min(input.length - 1, I + 1); i++) {
                        for (
                            let j = Math.max(0, J - 1);
                            j <= Math.min(input[i].length - 1, J + 1);
                            j++
                        ) {
                            if (/\*/.test(input[i][j])) {
                                starLocations.add(`${i}_${j}`);
                            }
                        }
                    }
                    J++;
                } while (J < input[I].length && /\d/.test(input[I][J]));

                starLocations.forEach((starLocation) => {
                    if (gears[starLocation]) {
                        gears[starLocation].push(+currentNumber);
                    } else {
                        gears[starLocation] = [+currentNumber];
                    }
                });
            }
        }
    }

    return Object.values(gears).reduce(
        (acc, partNumbers) =>
            partNumbers.length === 2 ? acc + partNumbers[0] * partNumbers[1] : acc,
        0,
    );
};

// -------------
// Solve problem
// -------------

const problem1: Solver = () => partNumberSum(INPUT);

const problem2: Solver = () => gearSum(INPUT);

// ---------------
// Display answers
// ---------------

solveWithLogs(problem1, 1);
// 540212 -> Yeah !

solveWithLogs(problem2, 2);
// 87605697 -> Yeah !
