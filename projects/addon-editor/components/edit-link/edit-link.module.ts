import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TuiAutoFocusModule} from '@taiga-ui/cdk';
import {TuiButtonModule, TuiLinkModule, TuiSvgModule} from '@taiga-ui/core';
import {TuiInputInlineModule} from '@taiga-ui/kit';
import {TuiEditLinkComponent} from './edit-link.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TuiAutoFocusModule,
        TuiButtonModule,
        TuiSvgModule,
        TuiLinkModule,
        TuiInputInlineModule,
    ],
    declarations: [TuiEditLinkComponent],
    exports: [TuiEditLinkComponent],
})
export class TuiEditLinkModule {}
