import {ListFormat} from "../list-format/list-format";

/**
 * Patches Intl with Intl.ListFormat
 */
export function patch (): void {
	if (typeof Intl === "undefined") {
		throw new TypeError(`Could not define Intl.ListFormat: Expected 'Intl' to exist. Remember to include polyfill for Intl.getCanonicalLocales before applying this polyfill`);
	}
	Intl.ListFormat = ListFormat;
}