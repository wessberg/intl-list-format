import {ListFormat} from "../list-format/list-format";
import {ElementPartition, ListPartition, ListPartitions} from "../list-partition/list-partition";
import {getInternalSlot} from "../internal-slot/internal-slot";
import {deconstructPattern} from "../deconstruct-pattern/deconstruct-pattern";
import {Placeables} from "../placeables/placeables";

/**
 * The CreatePartsFromList abstract operation is called with arguments listFormat
 * (which must be an object initialized as a ListFormat) and list (which must be a List of String values),
 * and creates the corresponding list of parts according to the effective locale and the formatting options of listFormat.
 * Each part is a Record with two fields: [[Type]], which must be a string with values "element" or "literal",
 * and [[Value]] which must be a string or a number.
 * @param {ListFormat} listFormat
 * @param {string[]} list
 * @return {ListPartitions}
 */
export function createPartsFromList(listFormat: ListFormat, list: string[]): ListPartitions {
	let pattern: string;

	// Let size be the number of elements of list.
	const size = list.length;

	// If size is 0, then
	if (size === 0) {
		// Return a new empty List.
		return [];
	}

	// If size is 2, then
	if (size === 2) {
		// Let pattern be listFormat.[[TemplatePair]].
		pattern = getInternalSlot(listFormat, "templatePair");

		// Let first be a new Record { [[Type]]: "element", [[Value]]: list[0] }.
		const first: ElementPartition = {
			type: "element",
			value: list[0]
		};

		// Let second be a new Record { [[Type]]: "element", [[Value]]: list[1] }.
		const second: ElementPartition = {
			type: "element",
			value: list[1]
		};

		// Let placeables be a new Record { [[0]]: first, [[1]]: second }.
		const placeables: Placeables = {
			0: first,
			1: second
		};

		// Return DeconstructPattern(pattern, placeables).
		return deconstructPattern(pattern, placeables);
	}

	// Let last be a new Record { [[Type]]: "element", [[Value]]: list[size - 1] }.
	const last: ElementPartition = {
		type: "element",
		value: list[size - 1]
	};

	// Let parts be « last ».
	let parts: ListPartition[] = [last];

	// Let i be size - 2.
	let i = size - 2;

	// Repeat, while i ≥ 0
	while (i >= 0) {
		// If i is 0, then
		if (i === 0) {
			// Let pattern be listFormat.[[TemplateStart]].
			pattern = getInternalSlot(listFormat, "templateStart");
		}

		// Else, if i is less than size - 2, then
		else if (i < size - 2) {
			// Let pattern be listFormat.[[TemplateMiddle]].
			pattern = getInternalSlot(listFormat, "templateMiddle");
		}

		// Else,
		else {
			// Let pattern be listFormat.[[TemplateEnd]].
			pattern = getInternalSlot(listFormat, "templateEnd");
		}

		// Let head be a new Record { [[Type]]: "element", [[Value]]: list[i] }.
		const head: ElementPartition = {
			type: "element",
			value: list[i]
		};

		// Let tail be a new Record { [[Type]]: "element", [[Value]]: parts }.
		const tail: ElementPartition = {
			type: "element",
			value: parts
		};

		// Let placeables be a new Record { [[0]]: head, [[1]]: tail }.
		const placeables: Placeables = {
			0: head,
			1: tail
		};

		// Set parts to DeconstructPattern(pattern, placeables).
		parts = deconstructPattern(pattern, placeables);

		// Decrement i by 1.
		i--;
	}

	// Return parts.
	return parts;
}
