import React from 'react'
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup({ isOpen, onClose }) {
  return (
    <PopupWithForm
      onClose={onClose}
      isOpen={isOpen}
      title="Обновить аватар"
      name="avatar"
      buttonName="Сохранить"
    >
      <input
        type="url"
        name="link"
        id="avatar"
        placeholder="Ссылка на картинку"
        required
        className="popup__item popup__item_form_avatar"
      />
      <span className="avatar-error popup__input-error"> </span>
    </PopupWithForm>
  )
}
export default EditAvatarPopup
