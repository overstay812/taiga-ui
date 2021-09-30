import {Component} from '@angular/core';
import {changeDetection} from '../../../../../change-detection-strategy';
import {encapsulation} from '../../../../../view-encapsulation';

@Component({
    selector: 'tui-line-clamp-example-2',
    templateUrl: './index.html',
    styleUrls: ['./index.less'],
    changeDetection,
    encapsulation,
})
export class TuiLineClampExample2 {
    linesLimit = 2;

    toggle() {
        this.linesLimit = this.collpased ? 10 : 2;
    }

    private get collpased(): boolean {
        return this.linesLimit === 2;
    }
}
