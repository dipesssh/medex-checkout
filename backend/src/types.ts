export type Scope =
  | { kind: "all" }
  | { kind: "type"; value: string }
  | { kind: "provider"; value: number };

export interface Service {
  id: string;
  title: string;
  type: string;
  providerId: number;
  providerName: string;
  price: string;
}

export interface Customer {
  id: string;
  name: string;
  ordersCount: number;
}

export interface Coupon {
  code: string;
  type: "percent" | "fixed";
  value: string;
  maxDiscount: string | null;
  minSpend: string;
  scope: Scope;
  startsOn: string;
  endsOn: string;
  usageLimit: number | null;
  usedCount: number;
  perCustomerLimit: number | null;
  usedBy: Record<string, number>;
  firstOrderOnly: boolean;
  stackable: boolean;
  status: string;
}

export interface QuoteRequest {
  lines: { serviceId: string; quantity: number }[];
  couponCodes: string[];
  customerId: string | null;
  at?: string;
}

export interface QuoteResponse {
  lines: {
    serviceId: string;
    quantity: number;
    amount: string;
    discounts: Record<string, string>;
    amountAfterDiscounts: string;
  }[];
  coupons: {
    code: string;
    status: "applied" | "rejected";
    discount?: string;
    reason?: string;
  }[];
  subtotal: string;
  discountTotal: string;
  netAmount: string;
  vat: string;
  total: string;
}

export interface Example {
  request: QuoteRequest;
  expected: QuoteResponse;
}

export interface CheckoutData {
  services: Service[];
  customers: Customer[];
  coupons: Coupon[];
  examples: Example[];
}