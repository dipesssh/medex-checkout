import { describe, it, expect } from "vitest";
import { parseMoney, formatMoney } from "../src/money";

describe("parseMoney", () => {
  it("converts baht strings to satang", () => {
    expect(parseMoney("3450.50")).toBe(345050n);
    expect(parseMoney("0.10")).toBe(10n);
    expect(parseMoney("1200")).toBe(120000n);
    expect(parseMoney("12.5")).toBe(1250n);
  });

  it("rejects bad input", () => {
    expect(() => parseMoney("abc")).toThrow();
    expect(() => parseMoney("1.234")).toThrow();
    expect(() => parseMoney("-5")).toThrow();
  });
});

describe("formatMoney", () => {
  it("converts satang back to baht strings", () => {
    expect(formatMoney(345050n)).toBe("3450.50");
    expect(formatMoney(10n)).toBe("0.10");
    expect(formatMoney(0n)).toBe("0.00");
  });

  it("round-trips", () => {
    expect(formatMoney(parseMoney("999.99"))).toBe("999.99");
  });
});