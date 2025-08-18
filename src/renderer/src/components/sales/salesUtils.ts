import { Product } from "../positions/utilsPositions";

type SaleType = {
  label: string;
};

export const SALE_TYPE: SaleType[] = [
  {
    label: "Nota de Venta",
  },
  {
    label: "Ticket",
  },
  {
    label: "Factura CFDI",
  },
];

export const SALESMEN = [
  {
    name: "Jorge Lara",
  },
  {
    name: "Ascención Morales",
  },
  {
    name: "Jacobo Morales",
  },
];

// Puts commas for the sellPrice
export function formatSellPrice(num: number): string {
  let toParseNum = "";
  const sliceArr = num.toString().split(".");

  if (sliceArr.length < 1) {
    toParseNum = num.toString().concat(".00");
  } else if (sliceArr[1].length === 1) {
    toParseNum = num.toString().concat("0");
  } else if (sliceArr[1].length === 2) {
    toParseNum = num.toString();
  } else {
    toParseNum = num.toString().slice(0, 2 - sliceArr[1].length);
  }

  const numDigits = toParseNum.length - 3;
  const firstCommaAt = numDigits % 3;
  const numCommas = (numDigits - firstCommaAt) / 3;

  let newStrNum = "";

  for (let i = 0; i < numCommas; i++) {
    if (i < 2) {
      newStrNum = newStrNum
        .concat(toParseNum.slice(firstCommaAt * i, firstCommaAt + 3 * i))
        .concat(",");
    } else {
      newStrNum = newStrNum
        .concat(
          toParseNum.slice(firstCommaAt + 3 * i, firstCommaAt + 3 * (i + 1))
        )
        .concat(",");
    }
  }

  return newStrNum.concat(toParseNum.slice(-6));
}

const USD_MXN = 19.5;

export function getPrice(product: Product): number {
  if (product.currency === "USD") return USD_MXN * product.sellPrice;

  return product.sellPrice;
}
