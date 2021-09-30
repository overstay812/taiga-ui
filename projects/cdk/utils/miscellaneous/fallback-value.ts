import {isPresent} from './is-present';

/**
 * If the value is null or undefined, returns default value
 * @param value
 * @param fallback alternative fallback
 */
export function fallbackValue<T>(value: T | null | undefined, fallback: T): T {
    return isPresent(value) ? value : fallback;
}
