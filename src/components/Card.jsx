import React from 'react'

function Card({ card, onCardClick }) {
  function handleCardClick() {
    onCardClick(card)
  }
  return (
    <div className="element">
      <img
        src={card.link}
        alt={card.name}
        className="element__image"
        onClick={handleCardClick}
      />
      <button
        type="button"
        className="element__delete-button"
        id="delete"
      ></button>
      <div className="element__group">
        <h2 className="element__title"> {card.name} </h2>
        <button type="button" className="element__like-button"></button>
      </div>
      <span className="element__like-counter" id="counter">
        {card.likes.length}
      </span>
    </div>
  )
}
export default Card
