import React from 'react'
import PopupWithForm from './PopupWithForm'

function AddPlacePopup({ isOpen, onClose }) {
  return (
    <PopupWithForm
      onClose={onClose}
      isOpen={isOpen}
      title="Новое место"
      name="add-element"
      buttonName="Создать"
    >
      <input
        type="text"
        name="name"
        id="names"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        className="popup__item popup__item_form_names"
      />
      <span className="names-error popup__input-error "> </span>
      <input
        type="url"
        name="link"
        id="url"
        placeholder="Ссылка на картинку"
        required
        className="popup__item popup__item_form_url"
      />
      <span className="url-error popup__input-error"> </span>
    </PopupWithForm>
  )
}

export default AddPlacePopup
