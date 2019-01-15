// @ts-ignore
import {extractListPatterns, localeIds} from "cldr";
import {sync} from "find-up";
import {dirname, join} from "path";
import {existsSync, mkdirSync} from "fs";
import {createProgramFromSources, SourceFileInput} from "./ts/create-program-from-sources";
import {LocaleDataEntry, LocaleDataEntryValueValueValue} from "../../src/locale/locale-data";
import stringify from "javascript-stringify";

// The directory on disk to write locale files to
const OUTPUT_DIRECTORY = join(dirname(sync("package.json")!), "locale-data");

// Ensure that the output directory exists
if (!existsSync(OUTPUT_DIRECTORY)) {
	mkdirSync(OUTPUT_DIRECTORY);
}
// Prepare sources
const sources: SourceFileInput[] = [];

/**
 * Formats a LocaleDataEntryValueValueValue based on the given input
 * @param {object} value
 * @returns{LocaleDataEntryValueValueValue}
 */
function formatLocaleDataEntryValueValueValue (value: { "2": string; start: string; middle: string; end: string }): LocaleDataEntryValueValueValue {
	return {
		Pair: value["2"],
		Start: value.start,
		Middle: value.middle,
		End: value.end
	};
}

// Loop through all locales
for (const localeId of localeIds) {
	// @ts-ignore
	const locale = Intl.getCanonicalLocales(localeId.replace(/_/g, "-"))[0];
	console.log(`Building data for locale: ${locale} (localeId: ${localeId})`);

	// Extract List patterns
	const patterns = extractListPatterns(localeId);

	const localeDataEntry: LocaleDataEntry = {
		formats: {
			conjunction: {
				long: formatLocaleDataEntryValueValueValue(patterns.default),
				short: formatLocaleDataEntryValueValueValue(patterns.default),
				narrow: formatLocaleDataEntryValueValueValue(patterns.default)
			},
			disjunction: {
				long: formatLocaleDataEntryValueValueValue(patterns.or),
				short: formatLocaleDataEntryValueValueValue(patterns.or),
				narrow: formatLocaleDataEntryValueValueValue(patterns.or)
			},
			unit: {
				long: formatLocaleDataEntryValueValueValue(patterns.unit || patterns.default),
				short: formatLocaleDataEntryValueValueValue(patterns.unitShort || patterns.unitNarrow || patterns.unit || patterns.default),
				narrow: formatLocaleDataEntryValueValueValue(patterns.unitNarrow || patterns.unitShort || patterns.unit || patterns.default)
			}
		}
	};

	// Add the source to the sources
	sources.push({
		fileName: join(OUTPUT_DIRECTORY, `${locale}.ts`),
		text: `\
		if ("__addLocaleData" in Intl.ListFormat) {
			Intl.ListFormat.__addLocaleData({
				locale: "${locale}",
				data: ${stringify(localeDataEntry, undefined, "  ")}
			});
		}`
	});
}

console.log(`Emitting locale data...`);

// Create a Program from the SourceFiles
const program = createProgramFromSources(sources);

// Emit all of them!
program.emit();

console.log(`Successfully built data!`);