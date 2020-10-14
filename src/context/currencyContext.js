import React from 'react'

const currencies = {
  usd: {
    name: 'usd',
    sign: '$',
    value: 0
  },
  eur: {
    name: 'eur',
    sign: '€',
    value: 1
  }
};

const CurrencyContext = React.createContext({
  currency: currencies.usd,
  setCurrency: () => {}
});

export { currencies, CurrencyContext }
