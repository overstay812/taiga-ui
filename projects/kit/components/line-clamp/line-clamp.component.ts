import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    HostListener,
    Inject,
    Input,
    Renderer2,
    ViewChild,
} from '@angular/core';
import {isCurrentTarget, tuiDefaultProp, tuiPure, typedFromEvent} from '@taiga-ui/cdk';
import {PolymorpheusContent, PolymorpheusOutletComponent} from '@tinkoff/ng-polymorpheus';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {filter, mapTo, pairwise, startWith, switchMap} from 'rxjs/operators';

@Component({
    selector: 'tui-line-clamp',
    templateUrl: './line-clamp.template.html',
    styleUrls: ['./line-clamp.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TuiLineClampComponent implements AfterViewInit {
    @Input()
    @tuiDefaultProp()
    set linesLimit(linesLimit: number) {
        this.linesLimit$.next(linesLimit);
    }

    @Input()
    @tuiDefaultProp()
    lineHeight = 24;

    @Input()
    @tuiDefaultProp()
    content: PolymorpheusContent = '';

    private readonly linesLimit$ = new BehaviorSubject(1);

    @ViewChild(PolymorpheusOutletComponent, {read: ElementRef})
    private readonly outlet?: ElementRef<HTMLElement>;

    private initialized = false;

    constructor(
        @Inject(ElementRef) private readonly elementRef: ElementRef<HTMLElement>,
        @Inject(Renderer2) renderer: Renderer2,
    ) {
        // Skipping initial transition
        setTimeout(() => {
            renderer.addClass(this.elementRef.nativeElement, '_initialized');
        });
    }

    @tuiPure
    get lineClamp$(): Observable<number> {
        return this.linesLimit$.pipe(
            startWith(1),
            pairwise(),
            switchMap(([prev, next]) =>
                next >= prev
                    ? of(next)
                    : typedFromEvent(this.elementRef.nativeElement, 'transitionend').pipe(
                          filter(isCurrentTarget),
                          mapTo(next),
                      ),
            ),
        );
    }

    get overflown(): boolean {
        if (!this.outlet) {
            return false;
        }

        const {scrollHeight, scrollWidth} = this.outlet.nativeElement;
        const {clientHeight, clientWidth} = this.elementRef.nativeElement;

        // 4px buffer for IE/Edge incorrectly rounding scrollHeight
        return scrollHeight - clientHeight > 4 || scrollWidth - clientWidth > 0;
    }

    get computedContent(): PolymorpheusContent {
        return this.overflown ? this.content : '';
    }

    get oneLine(): boolean {
        return this.linesLimit$.value === 1;
    }

    @HostBinding('style.maxHeight.px')
    get maxHeight(): number | null {
        return this.initialized ? this.lineHeight * this.linesLimit$.value : null;
    }

    @HostBinding('style.height.px')
    get height(): number | null {
        return !this.outlet ? 0 : this.outlet.nativeElement.scrollHeight + 4 || null;
    }

    ngAfterViewInit() {
        this.initialized = true;
    }

    // Change detection
    @HostListener('mouseenter')
    markForCheck() {}
}
