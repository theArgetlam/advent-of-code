import util from 'util';
import { Solver } from './solver';

/**
 * Wraps the solver to add some logs, like execution time.
 *
 * @param solver Function solving the problem. Takes no argument and returns number or string.
 * @param problemIndex Index of the problem, 1 or 2
 */
export const solveWithLogs = (solver: Solver, problemIndex: 1 | 2) => {
    console.log(`\n### Solving problem n°${problemIndex}...`);

    const timerLabel = `\n=> Solved problem ${problemIndex} in`;
    console.time(timerLabel);

    console.info(`\n\tAnswer:`, solver());

    console.timeEnd(timerLabel);

    console.info('\n');
};

export const deepObjectToString = (object: unknown, depth: number = null): string =>
    util.inspect(object, true, depth);
