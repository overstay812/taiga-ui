import {Location} from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    HostBinding,
    Inject,
    Input,
    Output,
} from '@angular/core';
import {DomSanitizer, SafeValue} from '@angular/platform-browser';
import {TUI_DEFAULT_COLOR_HANDLER} from '@taiga-ui/addon-charts/constants';
import {TuiColorHandler} from '@taiga-ui/addon-charts/types';
import {describeSector} from '@taiga-ui/addon-charts/utils';
import {
    sum,
    TuiContextWithImplicit,
    tuiDefaultProp,
    TuiIdService,
    tuiPure,
} from '@taiga-ui/cdk';
import {colorFallback, TuiSizeXL, TuiSizeXS} from '@taiga-ui/core';
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';

const RADII = {
    xs: '50',
    s: '50',
    m: '77.8',
    l: '81.9',
    xl: '81.3',
};
const TRANSFORM = {
    xs: 1.15,
    s: 1.25,
    m: 1.11,
    l: 1.09,
    xl: 1.08,
};

// TODO: Remove sanitizer when Angular version is bumped
@Component({
    selector: 'tui-pie-chart',
    templateUrl: './pie-chart.template.html',
    styleUrls: ['./pie-chart.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TuiPieChartComponent {
    @Input()
    @tuiDefaultProp()
    value: readonly number[] = [];

    @Input()
    @HostBinding('attr.data-tui-host-size')
    @tuiDefaultProp()
    size: TuiSizeXS | TuiSizeXL = 'm';

    @Input()
    @tuiDefaultProp()
    colorHandler: TuiColorHandler = TUI_DEFAULT_COLOR_HANDLER;

    @Input()
    @tuiDefaultProp()
    hintContent: PolymorpheusContent<TuiContextWithImplicit<number>> = '';

    @Input()
    @tuiDefaultProp()
    masked = false;

    @Input()
    @tuiDefaultProp()
    activeItemIndex = NaN;

    @Output()
    activeItemIndexChange = new EventEmitter<number>();

    private readonly autoIdString: string;

    constructor(
        @Inject(TuiIdService) idService: TuiIdService,
        @Inject(Location) private readonly locationRef: Location,
        @Inject(DomSanitizer) private readonly sanitizer: DomSanitizer,
    ) {
        this.autoIdString = idService.generate();
    }

    get maskId(): string {
        return 'tui-ring-chart-' + this.autoIdString;
    }

    get mask(): string | null {
        return this.masked
            ? `url(${this.locationRef.prepareExternalUrl(this.locationRef.path())}#${
                  this.maskId
              })`
            : null;
    }

    get radius(): string {
        return RADII[this.size];
    }

    get segments(): readonly string[] {
        return this.getSegments(this.value);
    }

    getTransform(index: number): string | null {
        const transform = this.masked
            ? `scale(${TRANSFORM[this.size]})`
            : `scale(${TRANSFORM['xs']})`;

        return index === this.activeItemIndex ? transform : null;
    }

    getHint(hint: PolymorpheusContent): PolymorpheusContent {
        return this.hintContent ? hint : '';
    }

    onHovered(hovered: boolean, index: number) {
        this.updateActiveItemIndex(hovered ? index : NaN);
    }

    @tuiPure
    getContentContext($implicit: number): TuiContextWithImplicit<number> {
        return {$implicit};
    }

    @tuiPure
    private getSegments(value: readonly number[]): readonly string[] {
        const total = sum(...value);

        return value
            .map((currentItem, currentIndex, array) =>
                array.reduce(
                    (sum, item, index) =>
                        index < currentIndex ? (item / total) * 360 + sum : sum,
                    (currentItem / total) * 360,
                ),
            )
            .map((angle, index, array) =>
                describeSector(array[index - 1] || 0, Math.min(angle, 359.9999)),
            );
    }

    private updateActiveItemIndex(index: number) {
        if (index === this.activeItemIndex) {
            return;
        }

        this.activeItemIndex = index;
        this.activeItemIndexChange.next(index);
    }

    getColor(index: number): SafeValue {
        return this.sanitizer.bypassSecurityTrustStyle(
            `var(--tui-chart-${index}, ${colorFallback(this.colorHandler(index))})`,
        );
    }
}
