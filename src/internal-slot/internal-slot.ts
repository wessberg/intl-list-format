import {ListFormatInstanceInternals} from "./list-format-instance-internals";
import {ListFormatStaticInternals} from "./list-format-static-internals";
import {ListFormat} from "../list-format/list-format";

/**
 * A WeakMap between ListFormat instances and their internal slot members
 * @type {WeakMap<ListFormat, ListFormatInstanceInternals>}
 */
export const LIST_FORMAT_INSTANCE_INTERNAL_MAP: WeakMap<ListFormat, ListFormatInstanceInternals> = new WeakMap();

/**
 * Contains the internal static for ListFormat
 * @type {ListFormatStaticInternals}
 */
export const LIST_FORMAT_STATIC_INTERNALS: ListFormatStaticInternals = {
	/**
	 * The value of the [[RelevantExtensionKeys]] internal slot is « ».
	 * http://tc39.github.io/proposal-intl-list-format/#sec-Intl.ListFormat-internal-slots
	 */
	relevantExtensionKeys: [],

	/**
	 * The value of the [[LocaleData]] internal slot is implementation defined within the constraints described in 9.1
	 * http://tc39.github.io/proposal-intl-list-format/#sec-Intl.ListFormat-internal-slots
	 */
	localeData: {},

	/**
	 * The value of the [[AvailableLocales]] internal slot is implementation defined within the constraints described in 9.1.
	 * http://tc39.github.io/proposal-intl-list-format/#sec-Intl.ListFormat-internal-slots
	 */
	availableLocales: []
};

/**
 * Sets the value for a property in an internal slot for an instance of ListFormat
 * @param {ListFormat} instance
 * @param {T} property
 * @param {ListFormatInstanceInternals[T]} value
 */
export function setInternalSlot<T extends keyof ListFormatInstanceInternals>(instance: ListFormat, property: T, value: ListFormatInstanceInternals[T]): void {
	let record = LIST_FORMAT_INSTANCE_INTERNAL_MAP.get(instance);
	if (record == null) {
		record = {} as ListFormatInstanceInternals;
		LIST_FORMAT_INSTANCE_INTERNAL_MAP.set(instance, record);
	}

	// Update the property with the given value
	record[property] = value;
}

/**
 * Gets the value associated with the given property on the internal slots of the given instance of ListFormat
 * @param {ListFormat} instance
 * @param {T} property
 * @returns{ListFormatInstanceInternals[T]}
 */
export function getInternalSlot<T extends keyof ListFormatInstanceInternals>(instance: ListFormat, property: T): ListFormatInstanceInternals[T] {
	const record = LIST_FORMAT_INSTANCE_INTERNAL_MAP.get(instance);
	if (record == null) {
		throw new ReferenceError(`No internal slots has been allocated for the given instance of ListFormat`);
	}

	return record[property];
}

/**
 * Returns true if the given property on the internal slots of the given instance of ListFormat exists
 * @param {ListFormat} instance
 * @param {T} property
 * @returns{ListFormatInstanceInternals[T]}
 */
export function hasInternalSlot<T extends keyof ListFormatInstanceInternals>(instance: ListFormat, property: T): boolean {
	const record = LIST_FORMAT_INSTANCE_INTERNAL_MAP.get(instance);
	return record != null && property in record;
}
