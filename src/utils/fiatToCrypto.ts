import Decimal from "decimal.js";

export function fiatToCrypto(fiat: string, rate: string) {
  const fiatAmount = new Decimal(Number(fiat));
  const cryptoRate = new Decimal(Number(rate));
  const cryptoAmount = fiatAmount.dividedBy(cryptoRate).toFixed(8);

  return help(cryptoAmount);
}

function help(cryptoAmount: string) {
  return cryptoAmount.replace(/(\.\d*?[1-9])0+$/g, "$1").replace(/\.0+$/, "");
}
