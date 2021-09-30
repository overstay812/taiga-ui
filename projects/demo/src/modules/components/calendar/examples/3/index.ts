import {Component} from '@angular/core';
import {TuiDay, TuiDayRange, TuiMonth} from '@taiga-ui/cdk';
import {TuiBaseColor, TuiColor, TuiMarkerHandler} from '@taiga-ui/core';
import {changeDetection} from '../../../../../change-detection-strategy';
import {encapsulation} from '../../../../../view-encapsulation';

const TWO_DOTS: [TuiColor, TuiColor] = [TuiBaseColor.Primary, TuiBaseColor.Secondary];
const ONE_DOT: [TuiColor] = [TuiBaseColor.Success];

@Component({
    selector: 'tui-calendar-example-3',
    templateUrl: './index.html',
    styleUrls: ['./index.less'],
    changeDetection,
    encapsulation,
})
export class TuiCalendarExample3 {
    readonly markerHandler: TuiMarkerHandler = (day: TuiDay) =>
        // Attention: do not create new arrays in handler, use constants intead
        day.day % 2 === 0 ? TWO_DOTS : ONE_DOT;

    value: TuiDayRange | null = null;

    firstMonth = TuiMonth.currentLocal();

    middleMonth = TuiMonth.currentLocal().append({month: 1});

    lastMonth = TuiMonth.currentLocal().append({month: 2});

    hoveredItem: TuiDay | null = null;

    onDayClick(day: TuiDay) {
        if (this.value === null || !this.value.isSingleDay) {
            this.value = new TuiDayRange(day, day);
        }

        this.value = TuiDayRange.sort(this.value.from, day);
    }

    onMonthChangeFirst(month: TuiMonth) {
        this.firstMonth = month;
        this.middleMonth = month.append({month: 1});
        this.lastMonth = month.append({month: 2});
    }

    onMonthChangeMiddle(month: TuiMonth) {
        this.firstMonth = month.append({month: -1});
        this.middleMonth = month;
        this.lastMonth = month.append({month: 1});
    }

    onMonthChangeLast(month: TuiMonth) {
        this.firstMonth = month.append({month: -2});
        this.middleMonth = month.append({month: -1});
        this.lastMonth = month;
    }
}
