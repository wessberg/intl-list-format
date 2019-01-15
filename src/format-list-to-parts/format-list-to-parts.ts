import {ListFormat} from "../list-format/list-format";
import {ListPartitions} from "../list-partition/list-partition";
import {createPartsFromList} from "../create-parts-from-list/create-parts-from-list";

/**
 * The FormatListToParts abstract operation is called with arguments listFormat
 * (which must be an object initialized as a ListFormat) and list (which must be a List of String values)
 *
 * http://tc39.github.io/proposal-intl-list-format/#sec-formatlisttoparts
 * @param {ListFormat} listFormat
 * @param {string[]} list
 * @returns {ListPartitions}
 */
export function formatListToParts (listFormat: ListFormat, list: string[]): ListPartitions {
	return createPartsFromList(listFormat, list);
}