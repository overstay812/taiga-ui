import {DOCUMENT} from '@angular/common';
import {inject, InjectionToken} from '@angular/core';
import {WINDOW} from '@ng-web-apis/common';
import {typedFromEvent} from '@taiga-ui/cdk/observables';
import {getActualTarget, getDocumentOrShadowRoot} from '@taiga-ui/cdk/utils';
import {merge, Observable, of, timer} from 'rxjs';
import {
    distinctUntilChanged,
    filter,
    map,
    mapTo,
    repeatWhen,
    share,
    startWith,
    switchMap,
    take,
    takeUntil,
    withLatestFrom,
} from 'rxjs/operators';
import {TUI_REMOVED_ELEMENT} from './removed-element';

export const TUI_ACTIVE_ELEMENT = new InjectionToken<Observable<EventTarget | null>>(
    'Active element on the document for ActiveZone',
    {
        factory: () => {
            const removedElement$ = inject(TUI_REMOVED_ELEMENT);
            const windowRef = inject(WINDOW);
            const documentRef = inject(DOCUMENT);
            const focusout$ = typedFromEvent(windowRef, 'focusout');
            const focusin$ = typedFromEvent(windowRef, 'focusin');
            const blur$ = typedFromEvent(windowRef, 'blur');
            const mousedown$ = typedFromEvent(windowRef, 'mousedown');
            const mouseup$ = typedFromEvent(windowRef, 'mouseup');

            return merge(
                focusout$.pipe(
                    takeUntil(mousedown$),
                    repeatWhen(() => mouseup$),
                    withLatestFrom(removedElement$),
                    filter(([event, removedElement]) =>
                        isValidFocusout(getActualTarget(event), removedElement),
                    ),
                    map(([{relatedTarget}]) => relatedTarget),
                ),
                blur$.pipe(
                    map(() => documentRef.activeElement),
                    filter(element => !!element && element.matches('iframe')),
                ),
                focusin$.pipe(
                    switchMap(event => {
                        const target = getActualTarget(event);
                        const root = getDocumentOrShadowRoot(target) as Document;

                        return root === documentRef
                            ? of(target)
                            : shadowRootActiveElement(root).pipe(startWith(target));
                    }),
                ),
                mousedown$.pipe(
                    switchMap(event =>
                        !documentRef.activeElement ||
                        documentRef.activeElement === documentRef.body
                            ? of(getActualTarget(event))
                            : focusout$.pipe(
                                  take(1),
                                  takeUntil(timer(0)),
                                  mapTo(getActualTarget(event)),
                              ),
                    ),
                ),
            ).pipe(distinctUntilChanged(), share());
        },
    },
);

// Checks if focusout event should be considered leaving active zone
function isValidFocusout(target: any, removedElement: Element | null): boolean {
    return (
        // Not due to switching tabs/going to DevTools
        target.ownerDocument?.activeElement !== target &&
        // Not due to button/input becoming disabled
        !target.disabled &&
        // Not due to element being removed from DOM
        (!removedElement || !removedElement.contains(target))
    );
}

function shadowRootActiveElement(root: Document): Observable<EventTarget | null> {
    return merge(
        typedFromEvent(root, 'focusin').pipe(map(({target}) => target)),
        typedFromEvent(root, 'focusout').pipe(
            filter(({target}) => isValidFocusout(target, null)),
            map(({relatedTarget}) => relatedTarget),
        ),
    );
}
