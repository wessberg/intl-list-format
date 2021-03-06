import {Locale} from "../locale/locale";
import {Locales} from "../locale/locales";
import {ListFormatOptions} from "../list-format-options/list-format-options";
import {SupportedLocalesOptions} from "../supported-locales-options/supported-locales-options";
import {ListPartitions} from "../list-partition/list-partition";
import {ResolvedListFormatOptions} from "../resolved-list-format-options/resolved-list-format-options";
import {toObject} from "../util/to-object";
import {InputLocaleDataEntry} from "../locale/locale-data";
import {getDefaultLocale, setDefaultLocale} from "../default-locale/get-default-locale";
import {getInternalSlot, hasInternalSlot, LIST_FORMAT_STATIC_INTERNALS, setInternalSlot} from "../internal-slot/internal-slot";
import {supportedLocales} from "../supported-locales/supported-locales";
import {resolveLocale} from "../resolve-locale/resolve-locale";
import {stringListFromIterable} from "../string-list-from-iterable";
import {formatList} from "../format-list/format-list";
import {formatListToParts} from "../format-list-to-parts/format-list-to-parts";
import {getOption} from "../util/get-option";
import {TYPE} from "../type/type";
import {STYLE} from "../style/style";
import {LOCALE_MATCHER} from "../locale-matcher/locale-matcher";

/**
 * The ListFormat constructor is the %ListFormat% intrinsic object and a standard built-in property of the Intl object.
 * Behaviour common to all service constructor properties of the Intl object is specified in 9.1.
 *
 * http://tc39.github.io/proposal-intl-list-format/#sec-intl-listformat-constructor
 */
export class ListFormat {
	// The spec states that the constructor must have a length of 0 and therefore be parameter-less
	constructor() {
		const locales = arguments[0] as Locale | Locales | undefined;
		let options = arguments[1] as Partial<ListFormatOptions>;

		// If NewTarget is undefined, throw a TypeError exception.
		if (new.target === undefined) {
			throw new TypeError(`Constructor Intl.ListFormat requires 'new'`);
		}

		// Let requestedLocales be ? CanonicalizeLocaleList(locales).
		const requestedLocales = Intl.getCanonicalLocales(locales);

		// If options is undefined, then (a) Let options be ObjectCreate(null).
		// Else (b) Let options be ? ToObject(options).
		options = options === undefined ? (Object.create(null) as Partial<ListFormatOptions>) : toObject(options);

		// Let opt be a new Record.
		const opt = Object.create(null) as ListFormatOptions;

		// Let matcher be ? GetOption(options, "localeMatcher", "string", « "lookup", "best fit" »,  "best fit").
		const matcher = getOption(options, "localeMatcher", "string", LOCALE_MATCHER, "best fit");

		// Set opt.[[localeMatcher]] to matcher.
		opt.localeMatcher = matcher;

		// Let type be GetOption(options, "type", "string", « "conjunction", "disjunction", "unit" »,  "conjunction").
		const type = getOption(options, "type", "string", TYPE, "conjunction");

		// Set listFormat.[[Type]] to type.
		setInternalSlot(this, "type", type);

		// Let style be GetOption(options, "style", "string", « "long", "short", "narrow" », "long").
		const style = getOption(options, "style", "string", STYLE, "long");

		// Set listFormat.[[Style]] to style.
		setInternalSlot(this, "style", style);

		// Let localeData be %ListFormat%.[[LocaleData]].
		const localeData = LIST_FORMAT_STATIC_INTERNALS.localeData;

		// Let r be ResolveLocale(%ListFormat%.[[AvailableLocales]], requestedLocales, opt, %ListFormat%.[[RelevantExtensionKeys]], localeData).
		const r = resolveLocale(
			LIST_FORMAT_STATIC_INTERNALS.availableLocales,
			requestedLocales,
			opt,
			LIST_FORMAT_STATIC_INTERNALS.relevantExtensionKeys,
			localeData
		);

		// Let dataLocale be r.[[dataLocale]].
		const dataLocale = r.dataLocale;

		// Let dataLocaleData be localeData.[[<dataLocale>]].
		const dataLocaleData = localeData[dataLocale]!;

		// Let dataLocaleTypes be dataLocaleData.[[<type>]].
		const dataLocaleTypes = dataLocaleData.formats[type];

		// Let templates be dataLocaleTypes.[[<style>]].
		const templates = dataLocaleTypes[style];

		// Set listFormat.[[TemplatePair]] to templates.[[Pair]].
		setInternalSlot(this, "templatePair", templates.Pair);

		// Set listFormat.[[TemplateStart]] to templates.[[Start]].
		setInternalSlot(this, "templateStart", templates.Start);

		// Set listFormat.[[TemplateMiddle]] to templates.[[Middle]].
		setInternalSlot(this, "templateMiddle", templates.Middle);

		// Set listFormat.[[TemplateEnd]] to templates.[[End]].
		setInternalSlot(this, "templateEnd", templates.End);

		// Set listFormat.[[Locale]] to r.[[locale]].
		setInternalSlot(this, "locale", r.locale);

		// Intl.ListFormat instances have an [[InitializedListFormat]] internal slot.
		setInternalSlot(this, "initializedListFormat", this);
	}

	/**
	 * Returns an array containing those of the provided locales that are supported without having to fall back to the runtime's default locale.
	 * @param {Locale | Locales} locales
	 * @returns{Locales}
	 */
	public static supportedLocalesOf(locales: Locale | Locales): Locales {
		// The spec states that the 'length' value of supportedLocalesOf must be equal to 1,
		// so we have to pull the options argument out of the method signature
		const options = arguments[1] as SupportedLocalesOptions | undefined;

		// Let availableLocales be %ListFormat%.[[AvailableLocales]].
		const availableLocales = LIST_FORMAT_STATIC_INTERNALS.availableLocales;

		// Let requestedLocales be ? CanonicalizeLocaleList(locales).
		const requestedLocales = Intl.getCanonicalLocales(locales);
		return supportedLocales(availableLocales, requestedLocales, options);
	}

	/**
	 * Adds locale data to the internal slot.
	 * This API exactly mimics that of the Intl polyfill (https://github.com/andyearnshaw/Intl.js)
	 * @private
	 * @internal
	 * @param {InputLocaleDataEntry} data
	 * @param {Locale} locale
	 */
	protected static __addLocaleData({data, locale}: InputLocaleDataEntry): void {
		// Use the locale as the default one if none is configured
		const defaultLocale = getDefaultLocale();
		if (defaultLocale == null) {
			setDefaultLocale(locale);
		}

		LIST_FORMAT_STATIC_INTERNALS.localeData[locale] = data;
		if (!LIST_FORMAT_STATIC_INTERNALS.availableLocales.includes(locale)) {
			LIST_FORMAT_STATIC_INTERNALS.availableLocales.push(locale);
		}
	}

	/**
	 * Formats the given list into a locale-sensitive string representation
	 * @param {Iterable<string>} [list]
	 * @returns{string}
	 */
	public format(list?: Iterable<string>): string {
		// Let lf be the this value.
		const lf = this;

		// If Type(lf) is not Object, throw a TypeError exception.
		if (!(lf instanceof Object)) {
			throw new TypeError(`Method Intl.ListFormat.prototype.format called on incompatible receiver ${this.toString()}`);
		}

		// If ListFormat does not have an [[InitializedListFormat]] internal slot, throw a TypeError exception.
		if (!hasInternalSlot(lf, "initializedListFormat")) {
			throw new TypeError(`Method Intl.ListFormat.prototype.format called on incompatible receiver ${this.toString()}`);
		}

		// Let stringList be ? StringListFromIterable(list).
		const stringList = stringListFromIterable(list);

		// Return FormatList(lf, stringList).
		return formatList(lf, stringList);
	}

	/**
	 * Formats the given list into locale-sensitive partitions
	 * @param {Iterable<string>} [list]
	 * @returns{ListPartitions}
	 */
	public formatToParts(list?: Iterable<string>): ListPartitions {
		// Let lf be the this value.
		const lf = this;

		// If Type(lf) is not Object, throw a TypeError exception.
		if (!(lf instanceof Object)) {
			throw new TypeError(`Method Intl.ListFormat.prototype.formatToParts called on incompatible receiver ${this.toString()}`);
		}

		// If listFormat does not have an [[InitializedListFormat]] internal slot, throw a TypeError exception.
		if (!hasInternalSlot(lf, "initializedListFormat")) {
			throw new TypeError(`Method Intl.ListFormat.prototype.formatToParts called on incompatible receiver ${this.toString()}`);
		}

		// Let stringList be ? StringListFromIterable(list).
		const stringList = stringListFromIterable(list);

		// Return FormatListToParts(lf, stringList).
		return formatListToParts(lf, stringList);
	}

	/**
	 * This method provides access to the locale and options computed during initialization of the object.
	 * @returns {ResolvedListFormatOptions}
	 */
	public resolvedOptions(): ResolvedListFormatOptions {
		// Let lf be the this value.
		const lf = this;

		// If Type(lf) is not Object, throw a TypeError exception.
		if (!(lf instanceof Object)) {
			throw new TypeError(`Method Intl.ListFormat.prototype.resolvedOptions called on incompatible receiver ${this.toString()}`);
		}

		// If listFormat does not have an [[InitializedListFormat]] internal slot, throw a TypeError exception.
		if (!hasInternalSlot(lf, "initializedListFormat")) {
			throw new TypeError(`Method Intl.ListFormat.prototype.resolvedOptions called on incompatible receiver ${this.toString()}`);
		}

		const locale = getInternalSlot(this, "locale");
		const type = getInternalSlot(this, "type");
		const style = getInternalSlot(this, "style");

		return {
			locale,
			type,
			style
		};
	}
}

/**
 * The initial value of the @@toStringTag property is the string value "Intl.ListFormat".
 * This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: true }.
 * @type {string}
 */
Object.defineProperty(ListFormat.prototype, Symbol.toStringTag, {
	writable: false,
	enumerable: false,
	value: "Intl.ListFormat",
	configurable: true
});
