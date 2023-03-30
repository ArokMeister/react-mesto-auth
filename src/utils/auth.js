export const BASE_URL = 'https://auth.nomoreparties.co';

function makeRequest(url, method, body, token) {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers
  }

  if (body !== undefined) {
    config.body = JSON.stringify(body)
  }

  function verifyResponse(res) {
    if (!res.ok) {
      return res.json().then(message => { 
        if (message.error) {
          throw new Error(message.error)
        }
        if (message.message) {
          throw new Error(message.message)
        }
      })
    }
    return res.json();
  }

  return fetch(`${BASE_URL}${url}`, config).then((res) => verifyResponse(res))
}

export const register = (email, password) => {
  return makeRequest('/signup', 'POST', { email, password })
}

export const authorize = (email, password) => {
  return makeRequest('/signin', 'POST', { email, password })
}

export const checkToken = (token) => {
  return makeRequest('/users/me', 'GET', undefined, token)
}