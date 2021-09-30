import {
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    HostBinding,
    Inject,
    Input,
    Output,
    QueryList,
    ViewChild,
} from '@angular/core';
import {
    AbstractTuiInteractive,
    isNativeFocused,
    setNativeFocused,
    TuiContextWithImplicit,
    TuiCreditCardAutofillName,
    tuiDefaultProp,
    TuiFocusableElementAccessor,
    tuiPure,
} from '@taiga-ui/cdk';
import {
    TUI_HINT_WATCHED_CONTROLLER,
    TuiHintControllerDirective,
} from '@taiga-ui/core/directives/hint-controller';
import {
    TUI_TEXTFIELD_WATCHED_CONTROLLER,
    TuiTextfieldController,
} from '@taiga-ui/core/directives/textfield-controller';
import {TuiAppearance} from '@taiga-ui/core/enums';
import {TUI_MODE, TUI_TEXTFIELD_APPEARANCE} from '@taiga-ui/core/tokens';
import {
    TuiBrightness,
    TuiHorizontalDirection,
    TuiSizeL,
    TuiSizeS,
} from '@taiga-ui/core/types';
import {getBorder, sizeBigger} from '@taiga-ui/core/utils/miscellaneous';
import {PolymorpheusContent, PolymorpheusOutletComponent} from '@tinkoff/ng-polymorpheus';
import {Observable} from 'rxjs';
import {TUI_PRIMITIVE_TEXTFIELD_PROVIDERS} from './primitive-textfield.providers';

const ICON_PADDING = 1.75;
const ICON_PADDING_S = 1.5;

@Component({
    selector: 'tui-primitive-textfield',
    templateUrl: './primitive-textfield.template.html',
    styleUrls: ['./primitive-textfield.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: TUI_PRIMITIVE_TEXTFIELD_PROVIDERS,
    host: {
        '($.data-mode.attr)': 'mode$',
    },
})
export class TuiPrimitiveTextfieldComponent
    extends AbstractTuiInteractive
    implements TuiFocusableElementAccessor {
    @Input()
    @tuiDefaultProp()
    editable = true;

    @Input()
    @tuiDefaultProp()
    filler = '';

    @Input()
    @tuiDefaultProp()
    iconAlign: TuiHorizontalDirection = 'right';

    // TODO: Remove null in 3.0
    @Input()
    @tuiDefaultProp()
    iconContent: PolymorpheusContent | null = null;

    @Input()
    @HostBinding('class._readonly')
    @tuiDefaultProp()
    readOnly = false;

    @Input()
    @tuiDefaultProp()
    invalid = false;

    @Input()
    @tuiDefaultProp()
    disabled = false;

    @Input()
    @tuiDefaultProp()
    postfix = '';

    @Input()
    @tuiDefaultProp()
    value = '';

    @Output()
    readonly valueChange = new EventEmitter<string>();

    @Output()
    readonly autofilledChange = new EventEmitter<boolean>();

    @ViewChild('focusableElement')
    private readonly focusableElement?: ElementRef<HTMLInputElement>;

    @ContentChildren(PolymorpheusOutletComponent)
    readonly content?: QueryList<unknown>;

    private autofilled = false;

    constructor(
        @Inject(TUI_MODE) readonly mode$: Observable<TuiBrightness | null>,
        @Inject(TUI_TEXTFIELD_APPEARANCE) readonly appearance: string,
        @Inject(TUI_TEXTFIELD_WATCHED_CONTROLLER)
        readonly controller: TuiTextfieldController,
        @Inject(TUI_HINT_WATCHED_CONTROLLER)
        readonly hintController: TuiHintControllerDirective,
    ) {
        super();
    }

    get nativeFocusableElement(): HTMLInputElement | null {
        return this.computedDisabled || !this.focusableElement
            ? null
            : this.focusableElement.nativeElement;
    }

    get focused(): boolean {
        return isNativeFocused(this.nativeFocusableElement);
    }

    @HostBinding('attr.data-tui-host-size')
    get size(): TuiSizeS | TuiSizeL {
        return this.controller.size;
    }

    @HostBinding('class._label-outside')
    get labelOutside(): boolean {
        return this.controller.labelOutside;
    }

    @HostBinding('class._invalid')
    get computedInvalid(): boolean {
        return !this.readOnly && !this.disabled && this.invalid;
    }

    get inputHidden(): boolean {
        return !!this.content?.length;
    }

    get isContextTable(): boolean {
        return this.appearance === TuiAppearance.Table;
    }

    get hasTooltip(): boolean {
        return !!this.hintController && !!this.hintController.content && !this.disabled;
    }

    get hasCustomContent(): boolean {
        return !!this.controller.customContent;
    }

    get iconPaddingLeft(): number {
        return this.size === 's' ? ICON_PADDING_S : ICON_PADDING;
    }

    get borderLeft(): number {
        return (
            (this.iconAlignLeft ? this.iconPaddingLeft : 0) +
            getBorder(sizeBigger(this.size, 'm'), false)
        );
    }

    get borderRight(): number {
        return getBorder(
            sizeBigger(this.size, 'm'),
            this.iconAlignRight,
            this.hasCleaner,
            this.hasTooltip,
            this.hasCustomContent,
        );
    }

    get hasPlaceholder(): boolean {
        return (
            (this.big && !this.labelOutside) ||
            (!this.hasValue && !this.hasExampleText && !this.hasPostfix)
        );
    }

    get placeholderRaised(): boolean {
        return (
            this.big &&
            !this.labelOutside &&
            ((this.computedFocused && !this.readOnly) || this.hasValue || this.autofilled)
        );
    }

    get iconAlignLeft(): boolean {
        return this.hasIcon && this.iconAlign === 'left';
    }

    get iconAlignRight(): boolean {
        return this.hasIcon && this.iconAlign === 'right';
    }

    get hasValue(): boolean {
        return !!this.value;
    }

    get hasCleaner(): boolean {
        return (
            this.controller.cleaner && this.hasValue && !this.disabled && !this.readOnly
        );
    }

    @HostBinding('class._right-aligned')
    get rightAligned(): boolean {
        return (
            this.appearance === TuiAppearance.Table &&
            (this.controller.inputMode === 'numeric' ||
                this.controller.inputMode === 'decimal')
        );
    }

    get hasValueDecoration(): boolean {
        const fillerOrExampleShown =
            this.computedFocused && !this.readOnly && this.hasFillerOrExampleText;

        return fillerOrExampleShown || this.hasPostfix;
    }

    get hasPostfix(): boolean {
        const isPostfixAllowed =
            this.hasValue || (this.computedFocused && !this.readOnly);

        return isPostfixAllowed && !!this.postfix;
    }

    get hasFillerOrExampleText(): boolean {
        return this.hasValue ? !!this.computedFiller : !!this.controller.exampleText;
    }

    get postfixShifted(): boolean {
        return this.postfix !== '%' && (this.hasFillerOrExampleText || this.hasValue);
    }

    get computedFiller(): string {
        return this.hasExampleText
            ? this.controller.exampleText
            : this.filler.slice(this.value.length);
    }

    // Safari expiration date autofill workaround
    get name(): 'ccexpiryyear' | null {
        return this.controller.autocomplete === TuiCreditCardAutofillName.CcExp
            ? 'ccexpiryyear'
            : null;
    }

    get context(): TuiContextWithImplicit<TuiSizeS | TuiSizeL> {
        return this.getContext(this.size);
    }

    clear() {
        if (this.nativeFocusableElement) {
            this.nativeFocusableElement.value = '';
        }

        this.updateValue('');
    }

    onMouseDown(event: MouseEvent) {
        if (
            !this.focusableElement ||
            event.target === this.focusableElement.nativeElement
        ) {
            return;
        }

        event.preventDefault();
        setNativeFocused(this.focusableElement.nativeElement);
    }

    onModelChange(value: string) {
        this.updateValue(value);
    }

    onHovered(hovered: boolean) {
        this.updateHovered(hovered);
    }

    onFocused(focused: boolean) {
        this.updateFocused(focused);
    }

    onAutofilled(autofilled: boolean) {
        this.updateAutofilled(autofilled);
    }

    private get big(): boolean {
        return this.size !== 's';
    }

    private get hasIcon(): boolean {
        return !!this.iconContent;
    }

    private get hasExampleText(): boolean {
        return (
            !!this.controller.exampleText &&
            this.computedFocused &&
            !this.hasValue &&
            !this.readOnly
        );
    }

    @tuiPure
    private getContext(
        $implicit: TuiSizeS | TuiSizeL,
    ): TuiContextWithImplicit<TuiSizeS | TuiSizeL> {
        return {$implicit};
    }

    private updateAutofilled(autofilled: boolean) {
        if (this.autofilled === autofilled) {
            return;
        }

        this.autofilled = autofilled;
        this.autofilledChange.emit(autofilled);
    }

    private updateValue(value: string) {
        this.value = value;
        this.valueChange.emit(value);
    }
}
