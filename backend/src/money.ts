// Money is stored as whole satang (1 baht = 100 satang) in a BigInt.
// BigInt is exact for whole numbers, so there are no floating-point errors.

export type Satang = bigint;

// "3450.50" -> 345050n
export function parseMoney(input: string): Satang {
  const match = /^(\d+)(?:\.(\d{1,2}))?$/.exec(input.trim());
  if (!match) throw new Error(`Invalid money string: ${input}`);
  const baht = BigInt(match[1] ?? "0");
  const satang = BigInt((match[2] ?? "").padEnd(2, "0") || "0");
  return baht * 100n + satang;
}

// 345050n -> "3450.50"
export function formatMoney(amount: Satang): string {
  const negative = amount < 0n;
  const abs = negative ? -amount : amount;
  const baht = abs / 100n;
  const satang = (abs % 100n).toString().padStart(2, "0");
  return `${negative ? "-" : ""}${baht}.${satang}`;
}