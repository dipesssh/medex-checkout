import { describe, it, expect } from "vitest";
import { loadData } from "../src/data";

describe("loadData", () => {
  it("loads the checkout file", () => {
    const data = loadData();
    expect(data.services).toHaveLength(6);
    expect(data.customers).toHaveLength(3);
    expect(data.coupons).toHaveLength(12);
    expect(data.examples).toHaveLength(3);
  });
});