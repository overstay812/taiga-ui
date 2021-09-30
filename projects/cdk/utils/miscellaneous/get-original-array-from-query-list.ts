import {QueryList} from '@angular/core';

/**
 * Extracts original array from {@link QueryList} rather than
 * creating a copy like {@link QueryList.toArray} does.
 * @param queryList
 * @returns original array from {@link QueryList}.
 */
export function getOriginalArrayFromQueryList<T>(
    queryList: QueryList<T>,
): ReadonlyArray<T> {
    let array: ReadonlyArray<T> = [];

    queryList.find((_item, _index, originalArray) => {
        array = originalArray;

        return true;
    });

    return array;
}
