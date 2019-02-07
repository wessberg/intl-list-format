import { Locale } from "./locale";

export interface LocaleDataEntryValueValueValue {
  Pair: string;
  Start: string;
  Middle: string;
  End: string;
}

export interface LocaleDataEntryValueValue {
  long: LocaleDataEntryValueValueValue;
  short: LocaleDataEntryValueValueValue;
  narrow: LocaleDataEntryValueValueValue;
}

export interface LocaleDataEntryValue {
  conjunction: LocaleDataEntryValueValue;
  disjunction: LocaleDataEntryValueValue;
  unit: LocaleDataEntryValueValue;
}

export interface LocaleDataEntry {
  formats: LocaleDataEntryValue;
}

export interface InputLocaleDataEntry {
  locale: Locale;
  data: LocaleDataEntry;
}

export type LocaleData = { [Key in Locale]?: LocaleDataEntry };
