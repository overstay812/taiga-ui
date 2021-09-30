import {Component} from '@angular/core';
import {TuiDay, TuiDayRange} from '@taiga-ui/cdk';
import {TUI_CALENDAR_DATA_STREAM} from '@taiga-ui/kit';
import {of} from 'rxjs';
import {changeDetection} from '../../../../../change-detection-strategy';
import {encapsulation} from '../../../../../view-encapsulation';

export const calendarStream$ = of(
    new TuiDayRange(new TuiDay(2019, 2, 11), new TuiDay(2019, 2, 14)),
);

@Component({
    selector: 'tui-range-example-2',
    templateUrl: './index.html',
    changeDetection,
    encapsulation,
    providers: [
        {
            provide: TUI_CALENDAR_DATA_STREAM,
            useValue: calendarStream$,
        },
    ],
})
export class TuiRangeExample2 {}
