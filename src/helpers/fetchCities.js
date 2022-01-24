export const fetchCities = async (ciso, siso) => {
  const headers = new Headers()
  headers.append('X-CSCAPI-KEY', process.env.REACT_APP_COUNTRY_STATE_CITY_API)

  const requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow',
  }

  return await fetch(
    `https://api.countrystatecity.in/v1/countries/${ciso}/states/${siso}/cities`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.log('error', error))
}
