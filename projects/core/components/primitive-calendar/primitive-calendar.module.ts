import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {
    TuiHoveredModule,
    TuiLetModule,
    TuiMapperPipeModule,
    TuiPressedModule,
    TuiRepeatTimesModule,
} from '@taiga-ui/cdk';
import {TuiColorModule} from '@taiga-ui/core/directives/color';
import {TuiCalendarSheetPipeModule} from '@taiga-ui/core/pipes';
import {TuiPrimitiveCalendarComponent} from './primitive-calendar.component';

@NgModule({
    imports: [
        CommonModule,
        TuiLetModule,
        TuiMapperPipeModule,
        TuiRepeatTimesModule,
        TuiHoveredModule,
        TuiPressedModule,
        TuiColorModule,
        TuiCalendarSheetPipeModule,
    ],
    declarations: [TuiPrimitiveCalendarComponent],
    exports: [TuiPrimitiveCalendarComponent],
})
export class TuiPrimitiveCalendarModule {}
