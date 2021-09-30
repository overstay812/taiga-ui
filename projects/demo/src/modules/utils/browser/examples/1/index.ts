import {Component, Inject} from '@angular/core';
import {USER_AGENT} from '@ng-web-apis/common';
import {isEdge, isEdgeOlderThan, isFirefox, isIE} from '@taiga-ui/cdk';
import {changeDetection} from '../../../../../change-detection-strategy';
import {encapsulation} from '../../../../../view-encapsulation';
@Component({
    selector: 'tui-browser-example-1',
    templateUrl: './index.html',
    changeDetection,
    encapsulation,
})
export class TuiBrowserExample1 {
    constructor(@Inject(USER_AGENT) private readonly userAgent: string) {}

    get aboutMyBrowser(): string {
        if (isEdge(this.userAgent)) {
            if (isEdgeOlderThan(13, this.userAgent)) {
                return 'Edge older than 13';
            }

            return 'Edge until 13';
        }

        if (isIE(this.userAgent)) {
            return 'Unfortunately, you have IE11';
        }

        if (isFirefox(this.userAgent)) {
            return 'Okay, you have Firefox!';
        }

        return 'You have Chromium based browser, cool!';
    }
}
