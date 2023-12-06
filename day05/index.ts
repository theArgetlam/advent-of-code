import path from 'path';
import { deepObjectToString, solveWithLogs } from '../utils/logs';
import { readInput } from '../utils/readFile';
import { Solver } from 'utils/solver';

// --------------
// Problem Inputs
// --------------

type Input = string[];

const testInputRaw = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

export const TEST_INPUT: Input = testInputRaw.split('\n\n');
export const INPUT: Input = readInput(path.resolve(__dirname, './input.txt')).split('\n\n');

// -------------------
// Your functions here
// -------------------

type MapRange = {
    destination: number;
    source: number;
    range: number;
};

type Map = MapRange[];

interface Almanac {
    seeds: number[];
    maps: Map[];
}

const parseInput = (input: Input): Almanac => {
    const rawSeeds = input.shift();
    const almanac: Almanac = {
        seeds: rawSeeds.replace('seeds: ', '').split(' ').map(Number),
        maps: [],
    };

    input.forEach((rawMap, mapIndex) => {
        const lines = rawMap.split('\n');
        lines.shift();
        // const mapName = lines.shift().replace(' map:', '');
        almanac.maps[mapIndex] = [];
        lines.forEach((line) => {
            const parts = line.split(' ');
            almanac.maps[mapIndex].push({
                destination: +parts[0],
                source: +parts[1],
                range: +parts[2],
            });
        });
        almanac.maps[mapIndex] = almanac.maps[mapIndex].sort((mapRangeA: MapRange, mapRangeB: MapRange) => )
    });

    return almanac;
};

// Problem 1

const mapNumber = (num: number, map: Map): number => {
    for (let i = 0; i < map.length; i++) {
        const { source, destination, range } = map[i];
        if (num >= source && num <= source + range) {
            return num - source + destination;
        }
    }

    return num;
};

const findLowestLocationBySeed = (input: Input) => {
    const almanac = parseInput(input);

    const locations = almanac.seeds.map((seed) =>
        almanac.maps.reduce((pos, map) => mapNumber(pos, map), seed),
    );

    return Math.min(...locations);
};

// Problem 2

type Range = [number, number];

const mapRanges = (ranges: Range[], map: Map): Range[] => {


    // for (let i = 0; i < map.length; i++) {
    //     const { source, destination, range } = map[i];
    //     if (num >= source && num <= source + range) {
    //         return num - source + destination;
    //     }
    // }

    return [];
};

const findLowestLocationBySeedRange = (input: Input) => {
    const almanac = parseInput(input);
    const seedRanges: Range[] = [];

    for (let i = 0; i < almanac.seeds.length - 1; i + 2) {
        seedRanges.push([almanac.seeds[i], almanac.seeds[i] + almanac.seeds[i + 1]]);
    }

    const locationsRanges = seedRanges.map((seedRange) =>
        almanac.maps.reduce((pos, map) => mapRanges(pos, map), [seedRange]),
    );

    // console.log(almanac.seeds, almanac.maps);

    return 0;
};

// -------------
// Solve problem
// -------------

const problem1: Solver = () => findLowestLocationBySeed(INPUT);

// const problem2: Solver = () => findLowestLocationBySeedRange(TEST_INPUT);

// ---------------
// Display answers
// ---------------

solveWithLogs(problem1, 1);
// 177942185

// solveWithLogs(problem2, 2);
