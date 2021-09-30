import {ComponentFixture} from '@angular/core/testing';
import {createKeyboardEvent} from './keyboard-event';

export function dispatchOnActive<T>(key: string, fixture?: ComponentFixture<T>) {
    if (document.activeElement) {
        document.activeElement.dispatchEvent(createKeyboardEvent(key, 'keydown'));
    }

    if (fixture) {
        fixture.detectChanges();
    }
}

export function activeText(): string {
    return document.activeElement && document.activeElement.textContent
        ? document.activeElement.textContent.trim()
        : '';
}

export function isActive(element: Element): boolean {
    return document.activeElement === element;
}
