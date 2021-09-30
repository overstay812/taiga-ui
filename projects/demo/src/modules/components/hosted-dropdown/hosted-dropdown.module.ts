import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {generateRoutes, TuiAddonDocModule} from '@taiga-ui/addon-doc';
import {TuiActiveZoneModule} from '@taiga-ui/cdk';
import {
    TuiButtonModule,
    TuiDataListModule,
    TuiDropdownControllerModule,
    TuiGroupModule,
    TuiHostedDropdownModule,
    TuiLinkModule,
    TuiNotificationModule,
    TuiSvgModule,
} from '@taiga-ui/core';
import {
    TuiDataListWrapperModule,
    TuiDropdownHoverModule,
    TuiInputModule,
    TuiSelectModule,
    TuiTabsModule,
} from '@taiga-ui/kit';
import {PolymorpheusModule} from '@tinkoff/ng-polymorpheus';
import {DropdownControllerDocumentationModule} from '../abstract/dropdown-controller-documentation/dropdown-controller-documentation.module';
import {TuiHostedDropdownExample1} from './examples/1';
import {TuiHostedDropdownExample2} from './examples/2';
import {TuiHostedDropdownExample3} from './examples/3';
import {TuiHostedDropdownExample4} from './examples/4';
import {ExampleTuiHostedDropdownComponent} from './hosted-dropdown.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PolymorpheusModule,
        FormsModule,
        TuiHostedDropdownModule,
        TuiDropdownHoverModule,
        TuiNotificationModule,
        TuiTabsModule,
        TuiInputModule,
        TuiButtonModule,
        TuiGroupModule,
        TuiSvgModule,
        TuiLinkModule,
        TuiSelectModule,
        TuiActiveZoneModule,
        TuiDropdownControllerModule,
        TuiDataListModule,
        TuiDataListWrapperModule,
        DropdownControllerDocumentationModule,
        TuiAddonDocModule,
        RouterModule.forChild(generateRoutes(ExampleTuiHostedDropdownComponent)),
    ],
    declarations: [
        TuiHostedDropdownExample1,
        TuiHostedDropdownExample2,
        TuiHostedDropdownExample3,
        TuiHostedDropdownExample4,
        ExampleTuiHostedDropdownComponent,
    ],
    exports: [ExampleTuiHostedDropdownComponent],
})
export class ExampleTuiHostedDropdownModule {}
