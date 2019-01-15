<a href="https://npmcharts.com/compare/intl-list-format?minimal=true"><img alt="Downloads per month" src="https://img.shields.io/npm/dm/intl-list-format.svg" height="20"></img></a>
<a href="https://david-dm.org/intl-list-format"><img alt="Dependencies" src="https://img.shields.io/david/intl-list-format.svg" height="20"></img></a>
<a href="https://www.npmjs.com/package/intl-list-format"><img alt="NPM Version" src="https://badge.fury.io/js/intl-list-format.svg" height="20"></img></a>
<a href="https://github.com/wessberg/intl-list-format/graphs/contributors"><img alt="Contributors" src="https://img.shields.io/github/contributors/wessberg%2Fintl-list-format.svg" height="20"></img></a>
<a href="https://opensource.org/licenses/MIT"><img alt="MIT License" src="https://img.shields.io/badge/License-MIT-yellow.svg" height="20"></img></a>
<a href="https://www.patreon.com/bePatron?u=11315442"><img alt="Support on Patreon" src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" height="20"></img></a>

# `intl-list-format`

> A fully spec-compliant polyfill for 'Intl.ListFormat'

## Description

This is a 1:1 implementation of the [`Intl.ListFormat`](https://github.com/tc39/proposal-intl-list-format) draft spec proposal ECMA-402, or the ECMAScript® Internationalization API Specification.

The `Intl.ListFormat` object is a constructor for objects that enable language-sensitive list formatting.
It is a really useful low-level primitive to build on top of which avoids the need to parse lots of CLDR raw data at the expense of your users and their internet connections.

Some highlights of this polyfill include:

- A very precise implementation of the spec, with cross-references inlined in the source code
- Conditional loading of Locale data for all CLDR locales
- Well-tested and well-documented.

It builds upon another member of the `Intl` family: `Intl.getCanonicalLocales`, so this must be polyfilled. [See this section for an overview](#dependencies--browser-support).

## Install

### NPM

```
$ npm install intl-list-format
```

### Yarn

```
$ yarn add intl-list-format
```

## Applying the polyfill

The polyfill will check for the existence of `Intl.ListFormat` and will _only_ be applied if the runtime doesn't already support it.

To include it, add this somewhere:

```typescript
import "intl-list-format";

// Or with commonjs:
require("intl-list-format");
```

However, it is strongly suggested that you only include the polyfill for runtimes that don't already support `Intl.ListFormat`.
One way to do so is with an async import:

```typescript
if (!("ListFormat" in Intl)) {
  await import("intl-list-format");

  // or with commonjs:
  require("intl-list-format");
}
```

Alternatively, you can use [Polyfill.app](https://github.com/wessberg/Polyfiller) which uses this polyfill and takes care of only loading the polyfill if needed as well as adding the language features that the polyfill depends on (See [dependencies](#dependencies--browser-support)).

## Loading locale data

By default, no CLDR locale data is loaded. Instead, _you_ decide what data you want.
To load data, you can import it via the `/locale-data` subfolder that comes with the NPM package:

With ES modules:

```typescript
// Load the polyfill
import "intl-list-format";

// Load data for the 'en' locale
import "intl-list-format/locale-data/en";
```

And naturally, it also works with commonjs:

```typescript
// Load the polyfill
require("intl-list-format");

// Load data for the 'en' locale
require("intl-list-format/locale-data/en");
```

Remember, if you're also depending on a polyfilled version of `Intl.getCanonicalLocales`, you will need to import that polyfill beforehand.

## Usage

The following examples are taken [directly from the original proposal](https://github.com/tc39/proposal-intl-list-format)

### Intl.ListFormat.prototype.format

```typescript
// Create a list formatter in your locale
// with default values explicitly passed in.
const lf = new Intl.ListFormat("en", {
  localeMatcher: "best fit", // other values: "lookup"
  type: "conjunction", // "conjunction", "disjunction" or "unit"
  style: "long" // other values: "short" or "narrow"
});

lf.format(["Motorcycle", "Truck", "Car"]);
// > "Motorcycle, Truck, and Car"
```

### Intl.ListFormat.prototype.formatToParts

```typescript
const lf = new Intl.ListFormat("en");
lf.formatToParts(["Foo", "Bar", "Baz"]);
// > [
// >   {type: "element", value: "Foo"},
// >   {type: "literal", value: ", "},
// >   {type: "element", value: "Bar"},
// >   {type: "literal", value: ", and "},
// >   {type: "element", value: "Baz"}
// > ]
```

### Intl.ListFormat.prototype.resolvedOptions

```typescript
const lf = new Intl.ListFormat("en", {type: "unit", style: "narrow"});

lf.resolvedOptions();
// > {locale: "en", style: "narrow", type: "unit"}
```

### Intl.ListFormat.supportedLocalesOf

```typescript
Intl.ListFormat.supportedLocalesOf(["foo", "bar", "en-US"]);
// > ["en-US"]
```

## Dependencies & Browser support

This polyfill is distributed in ES3-compatible syntax, but is using some additional APIs and language features which must be available:

- `Array.prototype.includes`
- `Object.create`
- `String.prototype.replace`
- `Symbol.toStringTag`,
- `WeakMap`
- `Intl.getCanonicalLocales`

For by far the most browsers, these features will already be natively available.
Generally, I would highly recommend using something like [Polyfill.app](https://github.com/wessberg/Polyfiller) which takes care of this stuff automatically.

## Contributing

Do you want to contribute? Awesome! Please follow [these recommendations](./CONTRIBUTING.md).

## Maintainers

- <a href="https://github.com/wessberg"><img alt="Frederik Wessberg" src="https://avatars2.githubusercontent.com/u/20454213?s=460&v=4" height="11"></img></a> [Frederik Wessberg](https://github.com/wessberg): _Maintainer_

## FAQ

### What is the default locale?

The default locale will be equal to the locale file you load first.

### Are there any known quirks?

Nope!

## Backers 🏅

[Become a backer](https://www.patreon.com/bePatron?u=11315442) and get your name, logo, and link to your site listed here.

## License 📄

MIT © [Frederik Wessberg](https://github.com/wessberg)
