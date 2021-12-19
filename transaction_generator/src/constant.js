export const COV_URI = "https://api.covalenthq.com/v1";
export const API_KEY = "ckey_ed8c8dac2460412fbbc73365d2f:";
export const NET_ITEMS = [
  { name: "Ethereum", value: 1 },
  { name: "Polygon/Matic", value: 137 },
  { name: "Avalanche C-Chain", value: 43114 },
  { name: "Binance Smart Chain", value: 56 },
  { name: "Fantom Opera", value: 250 },
  { name: "RSK", value: 30 },
  { name: "Arbitrum", value: 42161 },
  { name: "Palm", value: 11297108109 },
  { name: "Klaytn", value: 8217 },
  { name: "HECO", value: 128 },
  { name: "Moonriver", value: 1285 },
];
export const NET_NAMES = {
  1: "Ethereum",
  137: "Polygon/Matic",
  43114: "Avalanche C-Chain",
  56: "Binance Smart Chain",
  250: "Fantom Opera",
  30: "RSK",
  42161: "Arbitrum",
  11297108109: "Palm",
  8217: "Klaytn",
  128: "HECO",
  1285: "Moonriver",
};
export const PDFS_KEY = "f6e5919c42df41d28e2d9b7be6fa40e3";
export const CSS_STYLE = `body {
  margin: 0px;
  color: rgb(255, 255, 255);
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.5;
  letter-spacing: 0.00938em;
  background-color: rgb(255, 255, 255);
}
.background {
  -webkit-clip-path: polygon(0 0, 100% 0, 100% 20%, 0 100%);
          clip-path: polygon(0 0, 100% 0, 100% 20%, 0 100%);
  background-color: #3e2d8a;
  height: 170px;
  border-radius: 10px;
}
html{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;box-sizing:border-box;-webkit-text-size-adjust:100%;}
*,*::before,*::after{box-sizing:inherit;}
strong,b{font-weight:700;}
.css-tzs92q {
  box-sizing: border-box;
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
}
.css-1e6ne13 {
  flex-basis: 83.3333%;
  -webkit-box-flex: 0;
  flex-grow: 0;
  max-width: 83.3333%;
}
.css-134malw {
  padding: 8px;
  margin-bottom: 16px;
}
.css-mhwpe8 {
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 20%) 0px 3px 3px -2px, rgb(0 0 0 / 14%) 0px 3px 4px 0px, rgb(0 0 0 / 12%) 0px 1px 8px 0px;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.43;
  letter-spacing: 0.01071em;
  text-align: center;
  color: rgb(255, 255, 255);
  background-color: rgb(20, 39, 58);
  min-height: 1050px;
} 
.css-1l4w6pd {
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
}
.css-trykoa {
  padding: 16px 16px 16px 40px;
  margin-top: 24px;
}
.css-1odpvcy {
  padding: 16px 16px 16px 48px;
}
.css-l9m4v1 {
  padding-left: 48px;
  padding-right: 24px;
  text-align: left;
  margin-top: 48px;
}
.css-xz50d0 {
  padding-left: 48px;
  padding-right: 24px;
  text-align: left;
  margin-top: 24px;
}
.css-1xvinid {
  margin: 0px;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-size: 2.125rem;
  line-height: 1.235;
  letter-spacing: 0.00735em;
}
.css-1owb465 {
  display: table;
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0px;
}
.css-1wbz3t9 {
  display: table-header-group;
}
.css-1xnox0e {
  display: table-row-group;
}
.css-1gqug66 {
  color: inherit;
  display: table-row;
  vertical-align: middle;
  outline: 0px;
}
.css-fxpw6c {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.5rem;
  letter-spacing: 0.01071em;
  display: table-cell;
  vertical-align: inherit;
  border-bottom: 1px solid rgb(224, 224, 224);
  text-align: left;
  padding: 6px 16px;
  color: rgb(255, 255, 255);
}
.css-19idom {
  margin-bottom: 8px;
}
.css-1b7v5qd {
  padding: 8px 40px;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
}
.css-1anx036 {
  margin: 0px;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-weight: 500;
  font-size: 1.25rem;
  line-height: 1.6;
  letter-spacing: 0.0075em;
}
.css-9l3uo3 {
  margin: 0px;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.5;
  letter-spacing: 0.00938em;
}
.css-1uk1gs8 {
  margin: 0px;
}
`;
export const EMAIL_SERVER = "http://localhost:8080/send";
//export const CURRENCY_URI = 'https://api.coincap.io/v2/assets';
export const CURRENCY_USD = {
  "1": 4681.82,
  "137": 2.21,
  "43114": 113.16,
  "56": 1,
  "250": 1.51,
  "30": 48901.80,
  "42161": 0.004848,
  "11297108109": 18.74,
  "8217": 1.28,
  "128": 0.00001486,
  "1285": 194.20,
  btc: 57175.98,
  eth: 4681.82,
  bnb: 638.88,
  sol: 222.63,
  ada: 1.59,
  xrp: 1,
  dot: 37.38,
  usdc: 1,
  doge: 0.21,
  avax: 122.66,
  luna: 56.82,
  cro: 0.74,
  ltc: 210.82,
  wbtc: 57133.57,
  matic: 1.97,
  uni: 21.67,
  busd: 1,
  algo: 1.97,
  dai: 1,
  usdt: 1,
  shib: 0,
};
export const OTHER_USD = [1, 0.88, 1.28, 1.4, 1187.89, 1.37, 74.17, 113.72, 410.16, 0.92, 1.28, 76.01];
export const CUR_NAME = ["USD", "EUR", "CAD", "AUD", "KRW", "SGD", "RUB", "JPY", "NGN", "CHF", "GBP", "IND"];
// export const transform = (data, currency) => {
//   return (
//     parseFloat(
//       data.decoded.params[2].value.slice(
//         0,
//         -1 * data.sender_contract_decimals
//       ) +
//         "." +
//         data.decoded.params[2].value.slice(
//           -1 * data.sender_contract_decimals,
//           -1 * data.sender_contract_decimals + 3
//         )
//     ) *
//     (CURRENCY_USD[
//       data.sender_contract_ticker_symbol.toLowerCase()
//     ] || 1) *
//     (CURRENCY_USD[
//       DataTransfer.sender_contract_ticker_symbol.toLowerCase()
//     ]
//       ? OTHER_USD[currency]
//       : 1)
//   ).toFixed(2) +
//     (CURRENCY_USD[
//       data.sender_contract_ticker_symbol.toLowerCase()
//     ]
//       ? CUR_NAME[currency]
//       : data.sender_contract_ticker_symbol);
// };
