import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {generateRoutes, TuiAddonDocModule} from '@taiga-ui/addon-doc';
import {TuiCalendarModule, TuiLinkModule} from '@taiga-ui/core';
import {MarkdownModule} from 'ngx-markdown';
import {I18nComponent} from './i18n.component';

@NgModule({
    imports: [
        TuiCalendarModule,
        MarkdownModule,
        TuiLinkModule,
        TuiAddonDocModule,
        RouterModule.forChild(generateRoutes(I18nComponent)),
    ],
    declarations: [I18nComponent],
    exports: [I18nComponent],
})
export class I18nModule {}
