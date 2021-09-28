class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    _checkResponse(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers,
        }).then(this._checkResponse);
    }

    updateUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers,
        }).then(this._checkResponse);
    }
    editProfile({ name, job }) {
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: job,
            }),
        }).then(this._checkResponse);
    }
}
const api = new Api({
    url: "https://mesto.nomoreparties.co/v1/cohort-27",
    headers: {
        authorization: "3241e824-00fc-4fae-a12a-df6ad380713b",
        "Content-Type": "application/json",
    },
});
export default api;