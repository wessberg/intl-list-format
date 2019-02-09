import {ListFormat} from "../list-format/list-format";
import {createPartsFromList} from "../create-parts-from-list/create-parts-from-list";

/**
 * The FormatList abstract operation is called with arguments listFormat
 * (which must be an object initialized as a ListFormat) and list (which must be a List of String values)
 *
 * http://tc39.github.io/proposal-intl-list-format/#sec-formatlist
 * @param {ListFormat} listFormat
 * @param {string[]} list
 * @returns {string}
 */
export function formatList(listFormat: ListFormat, list: string[]): string {
	// Let parts be CreatePartsFromList(listFormat, list).
	const parts = createPartsFromList(listFormat, list);

	// Let result be an empty String.
	let result = "";

	// For each part in parts, do
	for (const part of parts) {
		// Set result to a String value produced by concatenating result and part.[[Value]].
		result += part.value;
	}

	return result;
}
