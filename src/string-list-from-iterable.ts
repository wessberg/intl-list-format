/**
 * Creates a String list from an iterable.
 * Algorithm: http://tc39.github.io/proposal-intl-list-format/#sec-createstringlistfromiterable
 * "This algorithm raises exceptions when it encounters values that are not Strings
 * because there is no obvious locale-aware coercion for arbitrary values."
 * @param {Iterable<string>} iterable
 * @return {string[]}
 */
export function stringListFromIterable(iterable?: Iterable<string>): string[] {
  // If iterable is undefined, then
  if (iterable === undefined) {
    // Return a new empty List.
    return [];
  }

  // Spread into an array
  const arr = [...iterable];

  // If any of the elements isn't a string, throw a TypeError
  if (arr.some(element => typeof element !== "string")) {
    throw new TypeError(`All List items must be strings`);
  }

  return arr;
}
