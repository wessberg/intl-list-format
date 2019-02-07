import test from "ava";
import "../src/patch/auto-patch";
import "../../locale-data/en";

// tslint:disable

test("Correctly formats lists into parts. #1", t => {
  const lf = new Intl.ListFormat("en");
  const result = lf.formatToParts(["Foo", "Bar", "Baz"]);
  t.deepEqual(result, [
    {
      type: "element",
      value: "Foo"
    },
    {
      type: "literal",
      value: ", "
    },
    {
      type: "element",
      value: "Bar"
    },
    {
      type: "literal",
      value: ", and "
    },
    {
      type: "element",
      value: "Baz"
    }
  ]);
});

test("Correctly formats lists into parts. #2", t => {
  const lf = new Intl.ListFormat("en");
  const result = lf.formatToParts(["Foo"]);
  t.deepEqual(result, [
    {
      type: "element",
      value: "Foo"
    }
  ]);
});

test("Correctly formats lists into parts. #3", t => {
  const lf = new Intl.ListFormat("en");
  const result = lf.formatToParts();
  t.deepEqual(result, []);
});

test("Correctly formats lists into parts. #4", t => {
  const lf = new Intl.ListFormat("en");
  const result = lf.formatToParts([]);
  t.deepEqual(result, []);
});
