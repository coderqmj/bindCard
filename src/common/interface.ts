export type RateType =
  | "USDT_USD"
  | "USDT_EUR"
  | "USDT_TRY"
  | "BTC_USD"
  | "BTC_EUR"
  | "BTC_TRY"
  | "ETH_USD"
  | "ETH_EUR"
  | "ETH_TRY";

export interface BuyParams {
  fiat: "USD" | "EUR" | "TRY"; // 法币
  amount: string; // 法币数量
  crypto: "USDT" | "BTC" | "ETH"; // 数字货币
}
