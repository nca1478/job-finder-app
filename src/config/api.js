const baseUrl = process.env.REACT_APP_API_URL

const get = (pathUrl, token) =>
  fetch(`${baseUrl}${pathUrl}`, {
    method: 'GET',
    headers: {
      Authorization: `jwt ${token}`,
    },
  }).then((res) => res.json())

const post = (pathUrl, data, token) =>
  fetch(`${baseUrl}${pathUrl}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `jwt ${token}`,
    },
    body: JSON.stringify(data),
  }).then((res) => res.json())

const put = (pathUrl, data, token) =>
  fetch(`${baseUrl}${pathUrl}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `jwt ${token}`,
    },
    body: JSON.stringify(data),
  }).then((res) => res.json())

const del = (pathUrl, token) =>
  fetch(`${baseUrl}${pathUrl}`, {
    method: 'DELETE',
    headers: {
      Authorization: `jwt ${token}`,
    },
  }).then((res) => res.json())

const file = (method, pathUrl, data, token) =>
  fetch(`${baseUrl}${pathUrl}`, {
    method,
    headers: {
      Authorization: `jwt ${token}`,
    },
    body: data,
  }).then((res) => res.json())

// Third-party API (https://countrystatecity.in/)
const getTp = async (pathUrl) => {
  const headers = new Headers()
  headers.append('X-CSCAPI-KEY', process.env.REACT_APP_COUNTRY_STATE_CITY_API)

  const requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow',
  }

  return await fetch(pathUrl, requestOptions)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.log('error', error))
}

export { get, post, put, del, file, getTp }
