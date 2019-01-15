import {ResolveLocaleOptions} from "./resolve-locale-options";
import {lookupMatcher} from "../matcher/lookup-matcher/lookup-matcher";
import {bestFitMatcher} from "../matcher/best-fit-matcher/best-fit-matcher";
import {ResolveLocaleResult} from "./resolve-locale-result";
import {Locales} from "../locale/locales";
import {RelevantExtensionKey} from "../relevant-extension-key/relevant-extension-key";
import {LocaleData} from "../locale/locale-data";

/**
 * The ResolveLocale abstract operation compares a BCP 47 language priority list
 * requestedLocales against the locales in availableLocales and determines the best available language to meet the request.
 * availableLocales, requestedLocales, and relevantExtensionKeys must be provided as List values,
 * options and localeData as Records.
 *
 * https://tc39.github.io/ecma402/#sec-resolvelocale
 * @param {Locales} availableLocales
 * @param {Locales} requestedLocales
 * @param {ResolveLocaleOptions} options
 * @param {RelevantExtensionKey[]} _relevantExtensionKeys
 * @param {LocaleData} _localeData
 * @returns {ResolveLocaleResult}
 */
export function resolveLocale (availableLocales: Locales, requestedLocales: Locales, options: ResolveLocaleOptions, _relevantExtensionKeys: RelevantExtensionKey[], _localeData: LocaleData): ResolveLocaleResult {
	// Let matcher be options.[[localeMatcher]].
	const matcher = options.localeMatcher;

	// If matcher is "lookup", then
	// (a) Let r be LookupMatcher(availableLocales, requestedLocales).
	// (b) Let r be BestFitMatcher(availableLocales, requestedLocales).
	const r = matcher === "lookup"
		? lookupMatcher({availableLocales, requestedLocales})
		: bestFitMatcher({availableLocales, requestedLocales});

	// Let foundLocale be r.[[locale]].
	let foundLocale = r.locale;

	// Let result be a new Record.
	const result = {} as ResolveLocaleResult;

	// Set result.[[dataLocale]] to foundLocale.
	result.dataLocale = foundLocale;

	// Let supportedExtension be "-u"
	const supportedExtension = "-u";

	// For each element key of relevantExtensionKeys in List order, do
	// CORRECTION: According to the spec, there _are_ no relevant extension keys, so there's no point in walking through them

	// If the number of elements in supportedExtension is greater than 2, then
	if (supportedExtension.length > 2) {

		// Let privateIndex be Call(%StringProto_indexOf%, foundLocale, « "-x-" »).
		const privateIndex = String.prototype.indexOf.call(foundLocale, "-x-");

		// If privateIndex = -1, then
		if (privateIndex === -1) {

			// Let foundLocale be the concatenation of foundLocale and supportedExtension.
			foundLocale = `${foundLocale}${supportedExtension}`;
		}

		// Else,
		else {

			// Let preExtension be the substring of foundLocale from position 0, inclusive, to position privateIndex, exclusive.
			const preExtension = foundLocale.slice(0, privateIndex);

			// Let postExtension be the substring of foundLocale from position privateIndex to the end of the string.
			const postExtension = foundLocale.slice(privateIndex);

			// Let foundLocale be the concatenation of preExtension, supportedExtension, and postExtension.
			foundLocale = `${preExtension}${supportedExtension}${postExtension}`;
		}

		// Assert: IsStructurallyValidLanguageTag(foundLocale) is true.
		// Let foundLocale be CanonicalizeLanguageTag(foundLocale).
		// Intl.getCanonicalLocales will throw a TypeError if the locale isn't structurally valid
		foundLocale = Intl.getCanonicalLocales(foundLocale)[0];
	}

	// Set result.[[locale]] to foundLocale.
	result.locale = foundLocale;

	// Return result.
	return result;
}