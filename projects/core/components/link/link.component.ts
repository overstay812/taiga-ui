import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    forwardRef,
    HostBinding,
    Inject,
    Input,
} from '@angular/core';
import {
    isNativeFocused,
    TUI_FOCUSABLE_ITEM_ACCESSOR,
    tuiDefaultProp,
    TuiDestroyService,
    TuiFocusableElementAccessor,
    TuiFocusVisibleService,
    TuiNativeFocusableElement,
} from '@taiga-ui/cdk';
import {MODE_PROVIDER} from '@taiga-ui/core/providers';
import {TUI_MODE} from '@taiga-ui/core/tokens';
import {TuiBrightness, TuiHorizontalDirection} from '@taiga-ui/core/types';
import {Observable} from 'rxjs';

// @bad TODO: Think about extending Interactive
@Component({
    selector: 'a[tuiLink], button[tuiLink]',
    templateUrl: './link.template.html',
    styleUrls: ['./link.style.less'],
    providers: [
        {
            provide: TUI_FOCUSABLE_ITEM_ACCESSOR,
            useExisting: forwardRef(() => TuiLinkComponent),
        },
        TuiFocusVisibleService,
        TuiDestroyService,
        MODE_PROVIDER,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'tuiLink',
    host: {
        '($.data-mode.attr)': 'mode$',
    },
})
export class TuiLinkComponent implements TuiFocusableElementAccessor {
    @Input()
    @HostBinding('class._pseudo')
    @tuiDefaultProp()
    pseudo = false;

    @Input()
    @tuiDefaultProp()
    icon: string | null = null;

    @Input()
    @tuiDefaultProp()
    iconAlign: TuiHorizontalDirection = 'right';

    @Input()
    @HostBinding('class._icon-rotated')
    @tuiDefaultProp()
    iconRotated = false;

    @Input()
    @HostBinding('attr.data-host-mode')
    @tuiDefaultProp()
    mode: 'positive' | 'negative' | null = null;

    @HostBinding('class._focus-visible')
    focusVisible = false;

    constructor(
        @Inject(ElementRef)
        private readonly elementRef: ElementRef<TuiNativeFocusableElement>,
        @Inject(TUI_MODE) readonly mode$: Observable<TuiBrightness | null>,
        @Inject(TuiFocusVisibleService)
        focusVisible$: TuiFocusVisibleService,
    ) {
        focusVisible$.subscribe(visible => {
            this.focusVisible = visible;
        });
    }

    get nativeFocusableElement(): TuiNativeFocusableElement {
        return this.elementRef.nativeElement;
    }

    get focused(): boolean {
        return isNativeFocused(this.nativeFocusableElement);
    }

    get hasIcon(): boolean {
        return this.icon !== null;
    }

    get iconAlignLeft(): boolean {
        return this.hasIcon && this.iconAlign === 'left';
    }

    get iconAlignRight(): boolean {
        return this.hasIcon && this.iconAlign === 'right';
    }
}
