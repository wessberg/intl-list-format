import test from "ava";
import "../src/patch/auto-patch";
import "../../locale-data/en";

// tslint:disable

test("Correctly formats conjunction lists. #1", t => {
  const lf = new Intl.ListFormat("en");
  const result = lf.format(["Foo", "Bar", "Baz"]);
  t.deepEqual(result, "Foo, Bar, and Baz");
});

test("Correctly formats conjunction lists. #2", t => {
  const lf = new Intl.ListFormat("en");
  const result = lf.format(["Foo"]);
  t.deepEqual(result, "Foo");
});

test("Correctly formats conjunction lists. #3", t => {
  const lf = new Intl.ListFormat("en");
  const result = lf.format();
  t.deepEqual(result, "");
});

test("Correctly formats conjunction lists. #4", t => {
  const lf = new Intl.ListFormat("en");
  const result = lf.format([]);
  t.deepEqual(result, "");
});

test("Correctly formats disjunction lists. #1", t => {
  const lf = new Intl.ListFormat("en", { type: "disjunction" });
  const result = lf.format(["Foo", "Bar", "Baz"]);
  t.deepEqual(result, "Foo, Bar, or Baz");
});

test("Correctly formats disjunction lists. #2", t => {
  const lf = new Intl.ListFormat("en", { type: "disjunction" });
  const result = lf.format(["Foo"]);
  t.deepEqual(result, "Foo");
});

test("Correctly formats disjunction lists. #3", t => {
  const lf = new Intl.ListFormat("en", { type: "disjunction" });
  const result = lf.format();
  t.deepEqual(result, "");
});

test("Correctly formats disjunction lists. #4", t => {
  const lf = new Intl.ListFormat("en", { type: "disjunction" });
  const result = lf.format([]);
  t.deepEqual(result, "");
});

test("Correctly formats unit lists. #1", t => {
  const lf = new Intl.ListFormat("en", { type: "unit" });
  const result = lf.format(["Foo", "Bar", "Baz"]);
  t.deepEqual(result, "Foo, Bar, Baz");
});

test("Correctly formats unit lists. #2", t => {
  const lf = new Intl.ListFormat("en", { type: "unit" });
  const result = lf.format(["Foo"]);
  t.deepEqual(result, "Foo");
});

test("Correctly formats unit lists. #3", t => {
  const lf = new Intl.ListFormat("en", { type: "unit" });
  const result = lf.format();
  t.deepEqual(result, "");
});

test("Correctly formats unit lists. #4", t => {
  const lf = new Intl.ListFormat("en", { type: "unit" });
  const result = lf.format([]);
  t.deepEqual(result, "");
});
