export const coefficientFunc = (valuta, dollar, euro, ruble) => {
  if (valuta === 'BYN') {
    return 1;
  } else if (valuta === 'USD') {
    return dollar;
  } else if (valuta === 'EUR') {
    return euro;
  } else if (valuta === 'RUB') {
    return ruble / 100;
  }
};
