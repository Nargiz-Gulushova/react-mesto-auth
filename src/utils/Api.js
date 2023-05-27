import { apiSettings } from "./apiConfig";

class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl; //'https://mesto.nomoreparties.co/v1/cohort-62
    this._headers = config.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // получаем все карточки с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    }).then((res) => this._checkResponse(res));
  }

  // создаем новую карточку (POST)
  addNewCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    }).then((res) => this._checkResponse(res));
  }

  // • получить данные пользователя (GET)
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }
  //
  // • заменить данные пользователя (PATCH)
  changeUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    }).then((res) => this._checkResponse(res));
  }
  // • заменить аватар (PATCH)
  changeAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    }).then((res) => this._checkResponse(res));
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes/`, {
      headers: this._headers,
      method: isLiked ? "DELETE" : "PUT",
    })
      .then((res) => this._checkResponse(res));
  }

  // • удалить карточку (DELETE)
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }
}

const api = new Api(apiSettings);

export default api;