/*
 * Returns a function, that, as long as it continues to be invoked, will only trigger every N milliseconds.
 * Adapted from https://davidwalsh.name/javascript-debounce-function
 * @param {Function} func - Function to be invoked
 * @param {Integer} wait - Timeout in milliseconds
 * @param {Boolean} immediate - If true trigger the function on the leading edge, instead of the trailing.
 * @returns {Function}
 */
export function debounce(func, wait, immediate) {
    let timeout;
    return function () {
        const context = this, args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}
