/**
 * Focuses or blurs and element
 *
 * @param element native element
 * @param focused boolean focused state
 * @param preventScroll optional flag to prevent native scroll to the element
 */
export function setNativeFocused(
    element: HTMLOrSVGElement,
    focused: boolean = true,
    preventScroll: boolean = false,
) {
    if (focused) {
        element.focus({preventScroll});
    } else {
        element.blur();
    }
}
