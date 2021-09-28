import React, { useState, useEffect } from 'react'
import Card from './Card'
import api from '../utils/api'

function Main({
  isEditAvatarPopupOpen,
  isEditProfilePopupOpen,
  isAddPlacePopupOpen,
  onCardClick,
}) {
  //Стейт для карточек
  const [user, setUser] = useState({})

  //Получаем данные по пользователю и карточки с сервера
  useEffect(() => {
    api
      .updateUserInfo()
      .then((res) => {
        setUser(res)
      })
      .catch((err) => console.log(err))
  }, [])

  //Стейт для карточек
  const [cards, setCards] = useState([])

  //Получаем данные по пользователю и карточки с сервера
  useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__group">
          <img
            className="profile__avatar"
            alt="аватар"
            src={user.avatar}
            onClick={isEditAvatarPopupOpen}
          />
          <div className="profile__avatar-pencil"> </div>
        </div>
        <div className="profile__info">
          <h1 className="profile__title"> {user.name} </h1>
          <button
            onClick={isEditProfilePopupOpen}
            type="button"
            className="profile__edit-button"
          ></button>
          <p className="profile__subtitle"> {user.about} </p>
        </div>
        <button
          onClick={isAddPlacePopupOpen}
          type="button"
          className="profile__add-button"
        ></button>
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card card={card} key={card._id} onCardClick={onCardClick} />
        ))}
      </section>
    </main>
  )
}

export default Main
