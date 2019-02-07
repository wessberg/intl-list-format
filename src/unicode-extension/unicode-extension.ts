/**
 * A Regular Expression that matches Unicode extension sequences
 * @type {RegExp}
 */
export const UNICODE_EXTENSION_SEQUENCE_REGEXP = /-u(?:-[0-9a-z]{2,8})+/gi;

/**
 * Removes all Unicode characters from the given string
 * @param {string} str
 * @returns{string}
 */
export function removeUnicodeExtensionSequences(str: string): string {
  return str.replace(UNICODE_EXTENSION_SEQUENCE_REGEXP, "");
}
