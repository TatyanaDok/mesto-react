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

    addNewCard(name, link) {
        return fetch(`${this._url}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link,
            }),
        }).then(this._checkResponse);
    }

    updateUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers,
        }).then(this._checkResponse);
    }
    editProfile(name, job) {
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: job,
            }),
        }).then(this._checkResponse);
    }

    editAvatar(url) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,

            body: JSON.stringify({
                avatar: url,
            }),
        }).then(this._checkResponse);
    }
    deleteCardFromServer(id) {
        return fetch(`${this._url}/cards/${id}`, {
            method: "DELETE",
            headers: this._headers,
        }).then(this._checkResponse);
    }
    putLike(cardId) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
            method: "PUT",
            headers: this._headers,
        }).then(this._checkResponse);
    }
    deleteLike(cardId) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        }).then(this._checkResponse);
    }
    changeLikeCardStatus(cardId, isLiked) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
            method: isLiked ? "PUT" : "DELETE",
            headers: this._headers,
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