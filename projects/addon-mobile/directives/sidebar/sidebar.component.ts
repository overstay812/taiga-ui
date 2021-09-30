import {AnimationOptions} from '@angular/animations';
import {
    ChangeDetectionStrategy,
    Component,
    DoCheck,
    HostBinding,
    Inject,
} from '@angular/core';
import {
    TUI_ANIMATION_OPTIONS,
    TuiAnimationOptions,
    TuiHorizontalDirection,
    tuiSlideIn,
} from '@taiga-ui/core';
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';
import {TuiSidebarDirective} from './sidebar.directive';

// @dynamic
@Component({
    selector: 'aside[tuiSidebar]',
    templateUrl: './sidebar.template.html',
    styleUrls: ['./sidebar.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [tuiSlideIn],
})
export class TuiSidebarComponent implements DoCheck {
    private readonly left = {
        value: 'left',
        ...this.options,
    } as const;

    private readonly right = {
        value: 'right',
        ...this.options,
    } as const;

    constructor(
        @Inject(TUI_ANIMATION_OPTIONS) private readonly options: AnimationOptions,
        @Inject(TuiSidebarDirective) private readonly directive: TuiSidebarDirective,
    ) {}

    @HostBinding('@tuiSlideIn')
    get animation(): TuiAnimationOptions {
        return this.direction === 'left' ? this.left : this.right;
    }

    @HostBinding('class')
    get direction(): TuiHorizontalDirection {
        return this.directive.direction;
    }

    get content(): PolymorpheusContent {
        return this.directive.content;
    }

    get autoWidth(): boolean {
        return this.directive.autoWidth;
    }

    ngDoCheck() {
        this.directive.check();
    }
}
