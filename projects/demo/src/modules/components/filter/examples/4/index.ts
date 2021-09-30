import {Component} from '@angular/core';
import {tuiPure} from '@taiga-ui/cdk';
import {TuiAppearance} from '@taiga-ui/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {changeDetection} from '../../../../../change-detection-strategy';
import {encapsulation} from '../../../../../view-encapsulation';

enum Department {
    IT = 'IT',
    HR = 'HR',
    HeadOffice = 'Heads',
    Delivery = 'Delivery',
}

@Component({
    selector: 'tui-filter-example-4',
    templateUrl: './index.html',
    styleUrls: ['./index.less'],
    changeDetection,
    encapsulation,
})
export class TuiFilterExample4 {
    readonly items = Object.values(Department);

    readonly filters$ = new BehaviorSubject<readonly string[]>([]);

    @tuiPure
    get model$(): Observable<readonly string[]> {
        return this.filters$.pipe(
            map(value => (value.length === this.items.length ? [] : value)),
        );
    }

    @tuiPure
    get buttonAppearance$(): Observable<TuiAppearance> {
        return this.filters$.pipe(
            map(value =>
                value.length === this.items.length
                    ? TuiAppearance.WhiteblockActive
                    : TuiAppearance.Whiteblock,
            ),
        );
    }

    onModelChange(model: readonly string[]) {
        this.filters$.next(model);
    }

    toggleAll() {
        this.filters$.next(
            this.items.length === this.filters$.value.length ? [] : [...this.items],
        );
    }
}
