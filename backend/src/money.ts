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

// Divides two non-negative BigInts and rounds half up.
// 5n / 2n = 2.5 -> 3n
export function divRoundHalfUp(numerator: bigint, denominator: bigint): bigint {
  if (denominator <= 0n) throw new Error("Denominator must be positive");
  if (numerator < 0n) throw new Error("Numerator must not be negative");
  return (numerator * 2n + denominator) / (denominator * 2n);
}

// Turns a percent string like "33.333" into an exact fraction:
// { num: 33333n, den: 1000n }
export function parsePercent(input: string): { num: bigint; den: bigint } {
  const match = /^(\d+)(?:\.(\d+))?$/.exec(input.trim());
  if (!match) throw new Error(`Invalid percent: ${input}`);
  const whole = match[1] ?? "0";
  const fraction = match[2] ?? "";
  return { num: BigInt(whole + fraction), den: 10n ** BigInt(fraction.length) };
}

// percent of an amount in satang, rounded half up to a whole satang.
// percentOf(435050n, "7") -> 30454n (that is 304.535 rounded up)
export function percentOf(amount: Satang, percent: string): Satang {
  const { num, den } = parsePercent(percent);
  return divRoundHalfUp(amount * num, den * 100n);
}