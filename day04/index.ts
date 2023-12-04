import path from 'path';
import { solveWithLogs } from '../utils/logs';
import { readInput } from '../utils/readFile';
import { Solver } from 'utils/solver';

// --------------
// Problem Inputs
// --------------

type Input = string[];

const testInputRaw = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

export const TEST_INPUT: Input = testInputRaw.split('\n');
export const INPUT: Input = readInput(path.resolve(__dirname, './input.txt')).split('\n');

// -------------------
// Your functions here
// -------------------

const computeMatchingCards = (rawCard: string): number => {
    const parts = rawCard.replace(/ +/g, ' ').split(/[:|]+/);
    const winningSet = new Set<string>(parts[1].trim().split(' '));
    const cardSet = new Set<string>(parts[2].trim().split(' '));
    let winningCardCount = 0;

    cardSet.forEach((num) => {
        if (winningSet.has(num)) {
            winningCardCount++;
        }
    });

    return winningCardCount;
};

const computePoints = (rawCard: string): number => {
    const winningCardCount = computeMatchingCards(rawCard);

    return winningCardCount && 2 ** (winningCardCount - 1);
};

const pointsSum = (input: Input): number =>
    input.reduce((sum, card) => (card ? sum + computePoints(card) : sum), 0);

const counCards = (input: Input): number => {
    const cards: number[] = [];
    let totalCount = 0;

    input.forEach((line, i) => {
        if (line) {
            const score = computeMatchingCards(line);
            const currentCardCount = cards[i] || 1;
            totalCount += currentCardCount;
            for (let j = i + 1; j < i + 1 + score; j++) {
                cards[j] = (cards[j] || 1) + currentCardCount;
            }
        }
    });

    return totalCount;
};

// -------------
// Solve problem
// -------------

const problem1: Solver = () => pointsSum(INPUT);

const problem2: Solver = () => counCards(INPUT);

// ---------------
// Display answers
// ---------------

// solveWithLogs(problem1, 1);
// 151976 -> too high
// 28843 -> too high
// 20855 -> Yeah (had some '' in my set counting as numbers) !

solveWithLogs(problem2, 2);
// 5489600 -> Yeah !
