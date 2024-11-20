export * from "./fiatToCrypto";
export * from "./getRandomStr";
export * from "./debounce";

export const hasXSSRisk = (input: string): boolean => {
  return (
    // /[<>]/.test(input) ||
    /<.*?(script|iframe|img|object|embed|form|input|on\w+).*?>/i.test(input) ||
    /(javascript:|eval\(|alert\(|on\w+=)/i.test(input)
  );
};
