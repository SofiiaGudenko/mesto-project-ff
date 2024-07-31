import { openPopup, closePopup } from "./modal.js";
import { apiDeleteCard } from "./api.js";

export function createCard(cardData, deleteCard, openImageClick, likeCard, userId) {
  const cardElement = document
    .querySelector('#card-template')
    .content.querySelector('.card')
    .cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeCount = cardElement.querySelector('.card__like-count');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCount.textContent = cardData.likes.length;

  // Проверка, лайкнута ли карточка текущим пользователем
  if (cardData.likes.some(like => like._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  // Отображаем кнопку удаления только для карточек текущего пользователя
  if (cardData.owner._id === userId) {
    deleteButton.classList.add('card__delete-button_visible');
    deleteButton.addEventListener('click', () => {
      openDeletePopup(cardData._id, cardElement);
    });
  } else {
    deleteButton.classList.remove('card__delete-button_visible');
  }

  likeButton.addEventListener('click', () => {
    likeCard(cardData._id, likeButton, likeCount);
  });

  // Обрабатываем клик по изображению
  cardImage.addEventListener('click', () => {
    openImageClick({ link: cardData.link, name: cardData.name });
  });

  return cardElement;
}

// Функция для открытия попапа удаления карточки
function openDeletePopup(cardId, cardElement) {
  const deletePopup = document.querySelector('.popup_type_delete');
  const confirmDeleteButton = deletePopup.querySelector('.popup__confirm-button');

  confirmDeleteButton.onclick = () => {
    apiDeleteCard(cardId)
      .then(() => {
        cardElement.remove();
      })
      .catch(err => console.error('Error deleting card:', err));
    closePopup(deletePopup);
  };

  openPopup(deletePopup);
}
