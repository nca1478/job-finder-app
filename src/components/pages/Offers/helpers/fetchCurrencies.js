export const fetchCurrencies = async () => {
  await getCurrencies('https://api.coinbase.com/v2/currencies').then((data) => {
    const currencies = parseDataCurrencies(data.data)
    sortListByLabel(currencies)
    setCurrencyOptions(currencies)
  })
}
