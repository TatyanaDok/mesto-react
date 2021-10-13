import React, { useState, useEffect } from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import EditProfilePopup from './EditProfilePopup'
import ImagePopup from './ImagePopup'
import ConfirmDeletePlacePopup from './ConfirmDeletePlacePopup'
import CurrentUserContext from '../contexts/CurrentUserContext'
import api from '../utils/api'

function App() {
  //Стейты
  const [isEditAvatarPopupOpen, setIsAvatarPopupOpen] = useState(false)
  const [isEditProfilePopupOpen, setIsProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(
    false,
  )
  const [cardIdForDelete, setCardIdForDelete] = useState('')
  const [currentUser, setCurrentUser] = useState({})
  const [selectedCard, setSelectedCard] = useState(null)
  const [cards, setCards] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    Promise.all([api.updateUserInfo(), api.getInitialCards()])
      .then(([user, cards]) => {
        setCurrentUser(user)
        setCards(cards)
      })
      .catch((err) => console.log(err))
  }, [])

  //Открытие попапа аватара
  function handleEditAvatarClick() {
    setIsAvatarPopupOpen(true)
  }

  //Открытие попапа данных пользователя
  function handleEditProfileClick() {
    setIsProfilePopupOpen(true)
  }

  //Открытие попапа с формой добавления данных
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  //Открытие попапа с изображением
  function handleCardClick(card) {
    setSelectedCard(card)
  }

  //Обработчик для открытия попапа удаления
  function handleDeleteCardClick(e) {
    setIsConfirmDeletePopupOpen(true)
    setCardIdForDelete(e._id)
  }

  //Закрытие поп-апов
  function closeAllPopups() {
    setIsAddPlacePopupOpen(false)
    setIsAvatarPopupOpen(false)
    setIsProfilePopupOpen(false)
    setIsConfirmDeletePopupOpen(false)
    setSelectedCard(null)
  }

  //Постановка лайка
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id)

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c))
        // Обновляем стейт
        setCards(newCards)
      })
      .catch((err) => console.log(err))
  }

  //Обработчик удаления данных с сервера
  function handleDeleteClick(cardId) {
    setIsLoading(true)
    api
      .deleteCardFromServer(cardId)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== cardId)
        setCards(newCards)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false)
      })
  }

  //Обработчик для отправки данных пользователя на сервер
  function handleUpdateUser(user) {
    setIsLoading(true)
    api
      .editProfile(user.name, user.about)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => console.log(err))

      .finally(() => {
        setIsLoading(false)
      })
  }

  //Обработчик для обновления аватарки пользователя
  function handleUpdateAvatar(user) {
    setIsLoading(true)
    api
      .editAvatar(user.avatar)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false)
      })
  }

  //Функция добавления карточки
  function handleAddPlaceSubmit(card) {
    setIsLoading(true)
    api
      .addNewCard(card.name, card.link)
      .then((res) => {
        setCards([res, ...cards])
        closeAllPopups()
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="root">
          <Header />
          <Main
            isEditAvatarPopupOpen={handleEditAvatarClick}
            isEditProfilePopupOpen={handleEditProfileClick}
            isAddPlacePopupOpen={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            cards={cards}
            onCardDelete={handleDeleteCardClick}
          />
          <Footer />
          <PopupWithForm />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            submitText={isLoading ? 'Сохранение...' : 'Сохранить'}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            submitText={isLoading ? 'Сохранение...' : 'Создать'}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            submitText={isLoading ? 'Сохранение...' : 'Сохранить'}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <ConfirmDeletePlacePopup
            isOpen={isConfirmDeletePopupOpen}
            onDeleteCard={handleDeleteClick}
            cardId={cardIdForDelete}
            onClose={closeAllPopups}
            submitText={isLoading ? 'Удаляем...' : 'Да'}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
