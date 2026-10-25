import { describe, it, expect } from "vitest";
import { divRoundHalfUp, percentOf } from "../src/money";

describe("divRoundHalfUp", () => {
  it("rounds half up", () => {
    expect(divRoundHalfUp(5n, 2n)).toBe(3n);
    expect(divRoundHalfUp(1n, 3n)).toBe(0n);
    expect(divRoundHalfUp(2n, 3n)).toBe(1n);
    expect(divRoundHalfUp(4n, 2n)).toBe(2n);
  });
});

describe("percentOf", () => {
  it("calculates VAT exactly (example 1)", () => {
    expect(percentOf(435050n, "7")).toBe(30454n);
  });

  it("handles whole and decimal percents", () => {
    expect(percentOf(120000n, "10")).toBe(12000n);
    expect(percentOf(1000n, "33.333")).toBe(333n);
    expect(percentOf(10n, "5")).toBe(1n);
  });
});