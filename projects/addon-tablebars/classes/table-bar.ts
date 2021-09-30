import {TuiBrightness} from '@taiga-ui/core';
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';
import {Observer} from 'rxjs';
import {TuiTableBarOptions} from '../interfaces/table-bar-options';

export class TableBar {
    readonly adaptive: boolean;

    readonly hasCloseButton: boolean;

    readonly mode: TuiBrightness;

    constructor(
        private readonly observer: Observer<never>,
        readonly content: PolymorpheusContent<{}>,
        options: TuiTableBarOptions = {},
    ) {
        const {mode = 'onLight', hasCloseButton = false, adaptive = false} = options;

        this.mode = mode;
        this.hasCloseButton = hasCloseButton;
        this.adaptive = adaptive;
    }

    close() {
        this.observer.complete();
    }
}
