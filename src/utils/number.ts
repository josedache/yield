import currencyJs from "currency.js";
import Currency from "enums/Currency";

export function formatNumber(n = "") {
  return n
    .toString()
    .replace(/^0|\D/g, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatNumberToCurrency(number = "", currency = Currency.NGN) {
  let value = number.toString();
  value = currencyJs(value, { symbol: currency.symbol }).format();
  return value;
}

export function formatCurrencyToNumber(string = "") {
  return string.toString().replace(/,/g, "");
}
