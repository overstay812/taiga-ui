import {Component} from '@angular/core';
import {TuiContextWithImplicit, tuiPure, TuiStringHandler} from '@taiga-ui/cdk';
import {of} from 'rxjs';
import {delay} from 'rxjs/operators';
import {changeDetection} from '../../../../../change-detection-strategy';
import {encapsulation} from '../../../../../view-encapsulation';

interface Python {
    readonly id: number;
    readonly name: string;
}

const ITEMS: ReadonlyArray<Python> = [
    {id: 42, name: 'John Cleese'},
    {id: 237, name: 'Eric Idle'},
    {id: 666, name: 'Michael Palin'},
    {id: 123, name: 'Terry Gilliam'},
    {id: 777, name: 'Terry Jones'},
    {id: 999, name: 'Graham Chapman'},
];

@Component({
    selector: 'tui-select-example-5',
    templateUrl: './index.html',
    styleUrls: ['./index.less'],
    changeDetection,
    encapsulation,
})
export class TuiSelectExample5 {
    value = 42;

    // Server request for items imitation
    readonly items$ = of(ITEMS).pipe(delay(3000));

    @tuiPure
    stringify(
        items: ReadonlyArray<Python>,
    ): TuiStringHandler<TuiContextWithImplicit<number>> {
        const map = new Map(items.map(({id, name}) => [id, name] as [number, string]));

        return ({$implicit}: TuiContextWithImplicit<number>) => map.get($implicit) || '';
    }
}
