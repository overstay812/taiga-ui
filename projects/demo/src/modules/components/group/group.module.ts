import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TuiCurrencyPipeModule} from '@taiga-ui/addon-commerce';
import {generateRoutes, TuiAddonDocModule} from '@taiga-ui/addon-doc';
import {
    TuiButtonModule,
    TuiDataListModule,
    TuiGroupModule,
    TuiHintControllerModule,
    TuiLinkModule,
    TuiModeModule,
    TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {
    TuiBadgeModule,
    TuiComboBoxModule,
    TuiDataListWrapperModule,
    TuiFieldErrorModule,
    TuiInputModule,
    TuiInputNumberModule,
    TuiProjectClassModule,
    TuiRadioBlockModule,
    TuiSelectModule,
} from '@taiga-ui/kit';
import {TuiGroupExample1} from './examples/1';
import {TuiGroupExample2} from './examples/2';
import {TuiGroupExample3} from './examples/3';
import {TuiGroupExample4} from './examples/4';
import {ExampleTuiGroupComponent} from './group.component';

@NgModule({
    imports: [
        TuiProjectClassModule,
        TuiRadioBlockModule,
        TuiLinkModule,
        TuiBadgeModule,
        TuiButtonModule,
        TuiSelectModule,
        TuiGroupModule,
        TuiInputModule,
        TuiFieldErrorModule,
        TuiComboBoxModule,
        TuiCurrencyPipeModule,
        TuiInputNumberModule,
        TuiModeModule,
        TuiDataListModule,
        TuiDataListWrapperModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TuiTextfieldControllerModule,
        TuiHintControllerModule,
        TuiAddonDocModule,
        RouterModule.forChild(generateRoutes(ExampleTuiGroupComponent)),
    ],
    declarations: [
        ExampleTuiGroupComponent,
        TuiGroupExample1,
        TuiGroupExample2,
        TuiGroupExample3,
        TuiGroupExample4,
    ],
    exports: [ExampleTuiGroupComponent],
})
export class ExampleTuiGroupModule {}
