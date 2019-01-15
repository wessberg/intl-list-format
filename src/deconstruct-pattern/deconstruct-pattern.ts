import {Placeables} from "../placeables/placeables";
import {ListPartition} from "../list-partition/list-partition";
import {isList} from "../assert/is-list";

/**
 * The DeconstructPattern abstract operation is called with arguments pattern
 * (which must be a String) and placeables (which must be a Record),
 * and deconstructs the pattern string into a list of parts.
 * The placeables record is a record whose keys are placeables tokens used in the pattern string,
 * and values are parts records which will be used in the result List to represent the token part.
 *
 * http://tc39.github.io/proposal-intl-list-format/#sec-deconstructpattern
 * @param {string} pattern
 * @param {Placeables} placeables
 * @return {ListPartition[]}
 */
export function deconstructPattern (pattern: string, placeables: Placeables): ListPartition[] {

	// Let result be a new empty List.
	const result: ListPartition[] = [];

	// Let beginIndex be ! Call(%StringProto_indexOf%, pattern, « "{", 0 »).
	let beginIndex = String.prototype.indexOf.call(pattern, "{", 0);

	// Let nextIndex be 0.
	let nextIndex = 0;

	// Let length be the number of code units in pattern.
	const length = pattern.length;

	// Repeat, while beginIndex is an integer index into pattern
	while (pattern[beginIndex] !== undefined) {

		// Let endIndex to ! Call(%StringProto_indexOf%, pattern, « "}", beginIndex »).
		const endIndex = String.prototype.indexOf.call(pattern, "}", beginIndex);

		// Assert: endIndex is greater than beginIndex.
		if (endIndex <= beginIndex) {
			throw new TypeError(`Expected endIndex: ${endIndex} to be greater than beginIndex: ${beginIndex}`);
		}

		// If beginIndex is greater than nextIndex, then
		if (beginIndex > nextIndex) {

			// Let literal be a substring of pattern from position nextIndex, inclusive, to position beginIndex, exclusive.
			const literal = pattern.slice(nextIndex, beginIndex);

			// Append a new Record { [[Type]]: "literal", [[Value]]: literal } as the last element of result
			result.push({
				type: "literal",
				value: literal
			});
		}

		// Let part be the substring of pattern from position beginIndex, exclusive, to position endIndex, exclusive.
		const part = pattern.slice(beginIndex + 1, endIndex);

		// Assert: placeables has a field [[<part>]].
		if (placeables[Number(part) as 0|1] == null) {
			throw new TypeError(`Expected placeables to have a part for PropertyKey: ${part}`);
		}

		// Let subst be placeables.[[<part>]].
		const subst = placeables[Number(part) as 0|1];

		// If Type(subst) is List, then
		if (isList(subst.value)) {

			// For each element s of subst in List order, do
			for (const s of subst.value) {

				// Append s as the last element of result.
				result.push(s);
			}
		}

		// Else,
		else {

			// Append subst as the last element of result.
			result.push(subst);
		}

		// Set nextIndex to endIndex + 1.
		nextIndex = endIndex + 1;

		// Set beginIndex to ! Call(%StringProto_indexOf%, pattern, « "{", nextIndex »).
		beginIndex = String.prototype.indexOf.call(pattern, "{", nextIndex);

	}

	// If nextIndex is less than length, then
	if (nextIndex < length) {

		// Let literal be the substring of pattern from position nextIndex, inclusive, to position length, exclusive.
		const literal = pattern.slice(nextIndex, length);

		// Append a new Record { [[Type]]: "literal", [[Value]]: literal } as the last element of result.
		result.push({
			type: "literal",
			value: literal
		});

	}

	// Return result
	return result;
}