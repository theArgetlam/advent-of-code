import path from 'path';
import { solveWithLogs } from '../utils/logs';
import { readInput } from '../utils/readFile';
import { Solver } from 'utils/solver';

// --------------
// Problem Inputs
// --------------

type Input = string[];

const testInputRaw = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
`;

export const TEST_INPUT: Input = testInputRaw.split('\n');
export const INPUT: Input = readInput(path.resolve(__dirname, './input.txt')).split('\n');

const strengthMap = {
    A: 12,
    K: 11,
    Q: 10,
    J: 9,
    T: 8,
    '9': 7,
    '8': 6,
    '7': 5,
    '6': 4,
    '5': 3,
    '4': 2,
    '3': 1,
    '2': 0,
};

const strengthMapWithJoker = {
    A: 12,
    K: 11,
    Q: 10,
    T: 9,
    '9': 8,
    '8': 7,
    '7': 6,
    '6': 5,
    '5': 4,
    '4': 3,
    '3': 2,
    '2': 1,
    J: 0,
};

// -------------------
// Your functions here
// -------------------

type Groups = Partial<Record<keyof typeof strengthMap, number>>;

interface Hand {
    cards: string;
    groups: Groups;
    strength: number;
    bid: number;
}

const getGroups = (cards: string, withJoker: boolean): Groups => {
    const groups: Groups = {};
    cards.split('').forEach((c) => {
        groups[c] = undefined === groups[c] ? 1 : groups[c] + 1;
    });

    if (withJoker && groups.J) {
        const highestCard = Object.entries(groups)
            .filter(([c]) => c !== 'J')
            .sort(
                ([c1, n1], [c2, n2]) =>
                    n2 * 13 + strengthMapWithJoker[c2] - (n1 * 13 + strengthMapWithJoker[c1]),
            )[0];

        console.log({ groups, highestCard });

        if (!highestCard) {
            return groups;
        }
        groups[highestCard[0]] += groups.J;
        delete groups.J;

        return groups;
    }

    return groups;
};

const getStrength = (hand: Hand, withJoker: boolean): number => {
    const cardsStrength = hand.cards
        .split('')
        .reduce(
            (s, c, i) => s + (withJoker ? strengthMapWithJoker : strengthMap)[c] * 13 ** (4 - i),
            0,
        );

    if (Object.values(hand.groups)[0] === 5) {
        // Five of a kind
        return cardsStrength + 13 ** 10;
    }

    if (Object.values(hand.groups).some((c) => c === 4)) {
        // Four of a kind
        return cardsStrength + 13 ** 9;
    }

    if (
        Object.values(hand.groups).some((c) => c === 3) &&
        Object.values(hand.groups).some((c) => c === 2)
    ) {
        // Full house
        return cardsStrength + 13 ** 8;
    }

    if (Object.values(hand.groups).some((c) => c === 3)) {
        // Three of a kind
        return cardsStrength + 13 ** 7;
    }

    if (Object.values(hand.groups).length === 3) {
        // Two pairs
        return cardsStrength + 13 ** 6;
    }

    if (Object.values(hand.groups).length === 4) {
        // One pair
        return cardsStrength + 13 ** 5;
    }

    return cardsStrength;
};

const parseHand = (handRaw: string, withJoker: boolean): Hand => {
    const [cards, bid] = handRaw.split(' ');

    const hand = {
        cards,
        bid: +bid,
        strength: 0,
        groups: getGroups(cards, withJoker),
    };

    hand.strength = getStrength(hand, withJoker);

    return hand;
};

const parseHands = (handsRaw: Input, withJoker: boolean): Hand[] => {
    const hands = [];
    handsRaw.forEach((handRaw) => {
        if (handRaw) {
            hands.push(parseHand(handRaw, withJoker));
        }
    });

    return hands;
};

const computeTotalWinnings = (handsRaw: Input, withJoker: boolean = false): number => {
    const hands = parseHands(handsRaw, withJoker);

    const sorted = hands.sort((h1, h2) => h1.strength - h2.strength);

    // console.log(sorted);

    return sorted.reduce((w, h, i) => w + (i + 1) * h.bid, 0);
};

// -------------
// Solve problem
// -------------

const problem1: Solver = () => computeTotalWinnings(INPUT);

const problem2: Solver = () => computeTotalWinnings(INPUT, true);

// ---------------
// Display answers
// ---------------

// solveWithLogs(problem1, 1);

solveWithLogs(problem2, 2);
// 254456791 => Too high
// 254187989 => Too low
// 254412181
