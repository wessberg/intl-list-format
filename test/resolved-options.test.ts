import test from "ava";
import "../src/patch/auto-patch";
import "../../locale-data/en";

// tslint:disable

test("Can properly resolve options based on the given options. #1", t => {
  const lf = new Intl.ListFormat();
  const result = lf.resolvedOptions();
  t.deepEqual(result, {
    locale: "en",
    style: "long", // Default value,
    type: "conjunction" // Default value
  });
});

test("Can properly resolve options based on the given options. #2", t => {
  const lf = new Intl.ListFormat("en", { type: "unit", style: "narrow" });
  const result = lf.resolvedOptions();
  t.deepEqual(result, {
    locale: "en",
    style: "narrow",
    type: "unit"
  });
});
