/**
 * Flattens two dimensional array and calculates resulting length
 *
 * @param array twi dimensional array
 */
export function flatLength(array: ReadonlyArray<ReadonlyArray<unknown>>): number {
    return array.reduce((count, section) => count + section.length, 0);
}
