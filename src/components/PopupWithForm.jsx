import React from 'react'

function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_${props.name} ${
        props.isOpen && 'popup_is-opened'
      } `}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button "
          onClick={props.onClose}
        ></button>
        <h2 className="popup__title"> {props.title} </h2>
        <form
          name={props.name}
          id="add-form"
          className="popup__form "
          noValidate
        >
          {props.children}
          <button type="submit" className="popup__button">
            {props.buttonName}
          </button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm
