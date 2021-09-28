import React, { useState } from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import EditProfilePopup from './EditProfilePopup'
import ImagePopup from './ImagePopup'

function App() {
  const [isEditAvatarPopupOpen, setIsAvatarPopupOpen] = useState(false)
  const [isEditProfilePopupOpen, setIsProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)

  //Обработчик кнопки редактирования аватарки
  function handleEditAvatarClick() {
    setIsAvatarPopupOpen(true)
  }

  //Обработчик кнопки редактирования инф-ии профиля
  function handleEditProfileClick() {
    setIsProfilePopupOpen(true)
  }

  //Обработчик кнопки добавления карточки
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  //Обработчик закрытия поп-апов
  function closeAllPopups() {
    setIsAddPlacePopupOpen(false)
    setIsAvatarPopupOpen(false)
    setIsProfilePopupOpen(false)
    setSelectedCard(null)
  }
  //Стейт для выбранной карточки, исп. в поп-апе картинки в полном размере
  const [selectedCard, setSelectedCard] = useState(null)

  function handleCardClick(card) {
    setSelectedCard(card)
  }
  return (
    <div className="body">
      <div className="root">
        <Header />
        <Main
          isEditAvatarPopupOpen={handleEditAvatarClick}
          isEditProfilePopupOpen={handleEditProfileClick}
          isAddPlacePopupOpen={handleAddPlaceClick}
          onCardClick={handleCardClick}
        />
        <Footer />
        <PopupWithForm
          onClose={closeAllPopups}
          name="confirm"
          title="Вы уверены?"
          buttonName="Да"
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />{' '}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />{' '}
      </div>
    </div>
  )
}

export default App
