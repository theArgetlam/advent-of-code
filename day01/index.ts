import path from 'path';
import { solveWithLogs } from '../utils/logs';
import { readInput } from '../utils/readFile';
import { Solver } from 'utils/solver';

// --------------
// Problem Inputs
// --------------

type Input = string[];

const testInputRaw = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

const testInputRaw2 = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

export const TEST_INPUT: Input = testInputRaw.split('\n');
export const TEST_INPUT2: Input = testInputRaw2.split('\n');
export const INPUT: Input = readInput(path.resolve(__dirname, './input.txt')).split('\n');

// -------------------
// Your functions here
// -------------------

const myFunction = (input: Input): number =>
    input.reduce((acc, line) => {
        const digits = line.split('').filter((c) => !Number.isNaN(+c));
        console.log(digits);

        return acc + +digits[0] * 10 + +digits[digits.length - 1];
    }, 0);

const replaceNumbers = (initialStr: string): string => {
    const DIGITS = {
        one: '1',
        two: '2',
        three: '3',
        four: '4',
        five: '5',
        six: '6',
        seven: '7',
        eight: '8',
        nine: '9',
    };

    const matches = initialStr.match(/one|two|three|four|five|six|seven|eight|nine/g);

    if (!matches) return initialStr;

    let resultingString = initialStr;

    resultingString = resultingString.replace(matches[0], DIGITS[matches[0]]);
    resultingString = resultingString.replace(
        matches[matches.length - 1],
        DIGITS[matches[matches.length - 1]],
    );

    // matches.forEach((match) => {
    //     resultingString = resultingString.replace(match, DIGITS[match]);
    // });

    return resultingString;
};

const myFunction2 = (input: Input): number =>
    input.reduce((acc, line) => {
        const digits = replaceNumbers(line)
            .split('')
            .filter((c) => !Number.isNaN(+c));
        console.log(digits);

        return acc + +digits[0] * 10 + +digits[digits.length - 1];
    }, 0);

// -------------
// Solve problem
// -------------

// const problem1: Solver = () => myFunction(INPUT);

const problem2: Solver = () => myFunction2(INPUT);

// ---------------
// Display answers
// ---------------

// solveWithLogs(problem1, 1);

solveWithLogs(problem2, 2);
// 54627 -> Too low
