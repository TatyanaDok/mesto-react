import React from 'react'
import Card from './Card'

function Main({
  isEditAvatarPopupOpen,
  isEditProfilePopupOpen,
  isAddPlacePopupOpen,
  user,
  cards,
  onCardClick,
}) {
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__group">
          <img
            className="profile__avatar"
            alt=""
            style={{ backgroundImage: `url(${user.avatar})` }}
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
