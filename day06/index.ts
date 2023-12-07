import path from 'path';
import { solveWithLogs } from '../utils/logs';
import { readInput } from '../utils/readFile';
import { Solver } from 'utils/solver';

// --------------
// Problem Inputs
// --------------

type Input = string[];

const testInputRaw = `Time:      7  15   30
Distance:  9  40  200
`;

export const TEST_INPUT: Input = testInputRaw.split('\n');
export const INPUT: Input = readInput(path.resolve(__dirname, './input.txt')).split('\n');

// -------------------
// Your functions here
// -------------------

// N = given time
// D = distance to beat
// n = holding time
// d = ditance

// d = n(N-n)

// We search for the minimum value of n so that n(N-n) > D
// The number of winning spots then is:
// N + 1 - 2n

// 52 & 426     => 11(52-11) = 451      => 53-2*11 = 31
// 94 & 1374    => 19(94-19) = 1377     => 95-2*19 = 57
// 75 & 1279    => 27(75-27) = 1296     => 76-2*27 = 22
// 94 & 1216    => 16(94-16) = 1248     => 95-2*16 = 63

// 41*61*22*63 = 3466386 => Too high
// 41*57*22*63 = 3239082 => Too hight :thinking:
// 31*57*22*63 = 2449062 => Too hight :thinking:

// Part 2

// 52947594
// 426137412791216

// d = n(N - n)
// n² - nN + d = 0
// x1 = (N-sqrt(delta))/2

// sqrt(delta) = 33149631,35...
// x1 = 9898981,320602748

// 52947595 - 2*9898981 = 33149631=> Yeah !

// const myFunction = (input: Input) => {
//     return "This ain't gonna solve itself alone !";
// };

// -------------
// Solve problem
// -------------

// const problem1: Solver = () => myFunction(TEST_INPUT);

// const problem2: Solver = () => myFunction(TEST_INPUT);

// ---------------
// Display answers
// ---------------

// solveWithLogs(problem1, 1);

// solveWithLogs(problem2, 2);
