import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {TuiBarSetModule} from '@taiga-ui/addon-charts/components/bar-set';
import {TuiFocusableModule, TuiMapperPipeModule} from '@taiga-ui/cdk';
import {TuiDescribedByModule, TuiHintModule} from '@taiga-ui/core';
import {PolymorpheusModule} from '@tinkoff/ng-polymorpheus';
import {TuiBarChartComponent} from './bar-chart.component';

@NgModule({
    imports: [
        CommonModule,
        PolymorpheusModule,
        TuiDescribedByModule,
        TuiBarSetModule,
        TuiFocusableModule,
        TuiHintModule,
        TuiMapperPipeModule,
    ],
    declarations: [TuiBarChartComponent],
    exports: [TuiBarChartComponent],
})
export class TuiBarChartModule {}
