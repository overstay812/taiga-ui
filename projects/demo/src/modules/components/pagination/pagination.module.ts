import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {generateRoutes, TuiAddonDocModule} from '@taiga-ui/addon-doc';
import {
    TuiBadgeModule,
    TuiInputSliderModule,
    TuiPaginationModule,
    TuiRadioListModule,
} from '@taiga-ui/kit';
import {PolymorpheusModule} from '@tinkoff/ng-polymorpheus';
import {TuiPaginationExample1} from './examples/1';
import {TuiPaginationExample2} from './examples/2';
import {TuiPaginationExample3} from './examples/3';
import {TuiPaginationExample4} from './examples/4';
import {ExampleTuiPaginationComponent} from './pagination.component';

@NgModule({
    imports: [
        TuiBadgeModule,
        TuiPaginationModule,
        TuiInputSliderModule,
        CommonModule,
        TuiRadioListModule,
        FormsModule,
        ReactiveFormsModule,
        TuiAddonDocModule,
        RouterModule.forChild(generateRoutes(ExampleTuiPaginationComponent)),
        PolymorpheusModule,
    ],
    declarations: [
        ExampleTuiPaginationComponent,
        TuiPaginationExample1,
        TuiPaginationExample2,
        TuiPaginationExample3,
        TuiPaginationExample4,
    ],
    exports: [ExampleTuiPaginationComponent],
})
export class ExampleTuiPaginationModule {}
