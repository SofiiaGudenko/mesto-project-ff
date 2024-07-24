import { cardTemplate, imagePopup } from "../index.js";
import { openPopup } from "./modal.js";

// Функция открытия изображения
function openImageClick(cardData) {
  openPopup(imagePopup);
  const popupImage = imagePopup.querySelector(".popup__image");
  const popupCaption = imagePopup.querySelector(".popup__caption");

  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
}

// Функция активации лайка на карточке
function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

export function createCard(cardData, deleteCallback, openImageClick, likeCard) {
  const cardElement = cardTemplate.cloneNode(true).querySelector(".card");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  cardImage.addEventListener("click", () => openImageClick(cardData));
  cardElement.querySelector(".card__like-button").addEventListener("click", likeCard);
  deleteButton.addEventListener("click", () => {
    deleteCallback(cardElement);
  });

  return cardElement;
}

// Функция удаления карточки
export function deleteCard(cardElement) {
  cardElement.remove();
}
