import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import type { CheckoutData } from "./types";

const here = dirname(fileURLToPath(import.meta.url));
const dataPath = join(here, "..", "..", "data", "checkout.json");

export function loadData(): CheckoutData {
  return JSON.parse(readFileSync(dataPath, "utf-8")) as CheckoutData;
}