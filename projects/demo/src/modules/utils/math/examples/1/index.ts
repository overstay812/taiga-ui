import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ceil, floor, round} from '@taiga-ui/cdk';
import {changeDetection} from '../../../../../change-detection-strategy';
import {encapsulation} from '../../../../../view-encapsulation';

@Component({
    selector: 'tui-math-example-1',
    templateUrl: './index.html',
    styleUrls: ['./index.less'],
    changeDetection,
    encapsulation,
})
export class TuiMathExample1 {
    parametersForm = new FormGroup({
        value: new FormControl(1.005),
        precision: new FormControl(2),
    });

    get rounded(): number {
        const {value, precision} = this.parametersForm.value;

        return round(value, precision);
    }

    get floored(): number {
        const {value, precision} = this.parametersForm.value;

        return floor(value, precision);
    }

    get ceiled(): number {
        const {value, precision} = this.parametersForm.value;

        return ceil(value, precision);
    }
}
