

class AuthApi {
  constructor() {
    this._url = 'http://api.mesto.klochkoff.nomoredomains.club';
  }

  register({ password, email }) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, email })
    }).then((res) => this._handleResponce(res))
  }

  login({ password, email }) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, email })
    }).then((res) => this._handleResponce(res))
  }

  getUser(token) {
    return fetch(`${this._url}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }).then((res) => this._handleResponce(res))
  }

  _handleResponce(res) {
    if (res.ok) {
      return res.json()
    }
    throw new Error(`Статус ошибки: ${res.status}`)
  }
}

const authApi = new AuthApi()

export default authApi