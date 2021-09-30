import {DOCUMENT, isPlatformServer} from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    OnInit,
    PLATFORM_ID,
} from '@angular/core';
import {SafeHtml} from '@angular/platform-browser';
import {TuiDestroyService} from '@taiga-ui/cdk';
import {TuiSvgService} from '@taiga-ui/core/services';
import {innerHTML} from '@taiga-ui/core/utils/polyfills';
import {takeUntil} from 'rxjs/operators';

// @dynamic
@Component({
    selector: 'tui-svg-defs-host',
    templateUrl: './svg-defs-host.template.html',
    styleUrls: ['./svg-defs-host.style.less'],
    providers: [TuiDestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TuiSvgDefsHostComponent implements OnInit {
    items!: IterableIterator<SafeHtml>;
    isBrowser = true;

    constructor(
        @Inject(DOCUMENT) documentRef: Document,
        @Inject(TuiSvgService) private readonly svgService: TuiSvgService,
        @Inject(ChangeDetectorRef) private readonly changeDetectorRef: ChangeDetectorRef,
        @Inject(TuiDestroyService)
        private readonly destroy$: TuiDestroyService,
        @Inject(PLATFORM_ID) platformId: Object,
    ) {
        this.isBrowser = !isPlatformServer(platformId);
        innerHTML(documentRef);
    }

    // @bad TODO: Looks like it could be async piped but it was probably written like that for a reason
    ngOnInit() {
        this.svgService.items$.pipe(takeUntil(this.destroy$)).subscribe(defsMap => {
            this.items = defsMap.values();
            this.changeDetectorRef.detectChanges();
        });
    }
}
