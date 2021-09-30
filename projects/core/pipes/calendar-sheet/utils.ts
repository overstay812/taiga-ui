import {
    DAYS_IN_WEEK,
    inRange,
    tuiAssert,
    TuiDay,
    TuiDayOfWeek,
    TuiMonth,
} from '@taiga-ui/cdk';

// TODO: Remove export in ivy compiation
/**
 * Computes day of week offset of the beginning of the month
 */
export const getMonthStartDaysOffset = (
    month: TuiMonth,
    firstDayOfWeek: TuiDayOfWeek,
): number => {
    const startMonthOffsetFromSunday = new Date(month.year, month.month, 1).getDay();

    return startMonthOffsetFromSunday >= firstDayOfWeek
        ? startMonthOffsetFromSunday - firstDayOfWeek
        : DAYS_IN_WEEK - (firstDayOfWeek - startMonthOffsetFromSunday);
};

/*
TODO: delete in v3.0:
 * TuiDay.getDayFromMonthRowCol
 * TuiMonth.monthStartDaysOffset
 * TuiMonth.weeksRowsCount
 * TuiYear.yearStartDaysOffset
 * TuiYear.getYearStartDaysOffset
 */
/**
 * Calculated day on a calendar grid
 * @return resulting day on these coordinates (could exceed passed month)
 */
export const getDayFromMonthRowCol = ({
    month,
    rowIndex,
    colIndex,
    firstDayOfWeek,
}: {
    month: TuiMonth;
    /**
     * row in a calendar
     */
    rowIndex: number;
    /**
     * column in a calendar
     */
    colIndex: number;
    /**
     * first day of the week index (Sunday - 0, Saturday - 6)
     */
    firstDayOfWeek: TuiDayOfWeek;
}): TuiDay => {
    tuiAssert.assert(Number.isInteger(rowIndex));
    tuiAssert.assert(inRange(rowIndex, 0, 6));
    tuiAssert.assert(Number.isInteger(colIndex));
    tuiAssert.assert(inRange(colIndex, 0, DAYS_IN_WEEK));

    let day =
        rowIndex * DAYS_IN_WEEK +
        colIndex -
        getMonthStartDaysOffset(month, firstDayOfWeek) +
        1;

    if (day > month.daysCount) {
        day = day - month.daysCount;
        month = month.append({month: 1});
    }

    if (day <= 0) {
        month = month.append({month: -1});
        day = month.daysCount + day;
    }

    return new TuiDay(month.year, month.month, day);
};
