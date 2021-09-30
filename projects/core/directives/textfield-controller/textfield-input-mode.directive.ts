import {Directive, forwardRef, InjectionToken, Input} from '@angular/core';
import {TuiController, TuiInputModeT} from '@taiga-ui/cdk';

export const TUI_TEXTFIELD_INPUT_MODE = new InjectionToken<TuiTextfieldInputModeDirective>(
    'tuiTextfieldInputMode',
    {factory: inputModeDirectiveFactory},
);

@Directive({
    selector: '[tuiTextfieldInputMode]',
    providers: [
        {
            provide: TUI_TEXTFIELD_INPUT_MODE,
            useExisting: forwardRef(() => TuiTextfieldInputModeDirective),
        },
    ],
})
export class TuiTextfieldInputModeDirective extends TuiController {
    @Input('tuiTextfieldInputMode')
    inputMode: TuiInputModeT = 'text';
}

export function inputModeDirectiveFactory(): TuiTextfieldInputModeDirective {
    return new TuiTextfieldInputModeDirective();
}
