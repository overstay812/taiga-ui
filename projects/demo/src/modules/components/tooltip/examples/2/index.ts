import {Component} from '@angular/core';
import {changeDetection} from '../../../../../change-detection-strategy';
import {encapsulation} from '../../../../../view-encapsulation';

@Component({
    selector: 'tui-tooltip-example-2',
    templateUrl: './index.html',
    styleUrls: ['./index.less'],
    changeDetection,
    encapsulation,
})
export class TuiTooltipExample2 {}
