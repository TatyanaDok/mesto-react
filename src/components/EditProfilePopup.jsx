import React from 'react'
import PopupWithForm from './PopupWithForm'

function EditProfilePopup({ isOpen, onClose }) {
  return (
    <PopupWithForm
      onClose={onClose}
      isOpen={isOpen}
      title="Редактировать профиль"
      name="edit-element"
      buttonName="Сохранить"
    >
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        className="popup__item popup__item_form_name"
      />
      <span className="name-error popup__input-error "> </span>
      <input
        type="text"
        name="job"
        id="job"
        placeholder="О себе"
        required
        minLength="2"
        maxLength="200"
        className="popup__item popup__item_form_job"
      />
      <span className="job-error popup__input-error "> </span>
    </PopupWithForm>
  )
}

export default EditProfilePopup
