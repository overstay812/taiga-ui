import {
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    forwardRef,
    HostBinding,
    Input,
    QueryList,
    TemplateRef,
} from '@angular/core';
import {EMPTY_QUERY, tuiDefaultProp} from '@taiga-ui/cdk';
import {TuiModeDirective, TuiSizeL} from '@taiga-ui/core';
import {Subject} from 'rxjs';
import {TuiBreadcrumbDirective} from './breadcrumb.directive';

@Component({
    selector: 'tui-breadcrumbs:not([items])',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './breadcrumbs-wrapper.template.html',
    styleUrls: ['./breadcrumbs-wrapper.style.less'],
    providers: [
        {
            provide: TuiModeDirective,
            useExisting: forwardRef(() => TuiBreadcrumbsWrapperComponent),
        },
    ],
})
export class TuiBreadcrumbsWrapperComponent implements TuiModeDirective {
    @Input()
    @HostBinding('attr.data-size')
    @tuiDefaultProp()
    size: TuiSizeL = 'm';

    @ContentChildren(TuiBreadcrumbDirective, {read: TemplateRef})
    readonly items: QueryList<TemplateRef<{}>> = EMPTY_QUERY;

    readonly change$ = new Subject<void>();
    readonly mode = 'onLight';

    ngOnChanges() {}
}
