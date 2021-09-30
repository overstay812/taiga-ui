import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {changeDetection} from '../../../../../change-detection-strategy';
import {encapsulation} from '../../../../../view-encapsulation';

@Component({
    selector: 'tui-input-example-6',
    templateUrl: './template.html',
    styleUrls: ['./style.less'],
    changeDetection,
    encapsulation,
})
export class TuiInputExample6 {
    readonly items = ['Black', 'Gold', 'Silver'];
    readonly form = new FormGroup({
        name: new FormControl('', Validators.required),
        date: new FormControl(null, Validators.required),
        color: new FormControl(null, Validators.required),
        quantity: new FormControl(),
        sum: new FormControl(255),
    });
}
