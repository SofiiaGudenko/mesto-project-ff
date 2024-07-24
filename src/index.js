import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import { createCard, deleteCard } from "./components/card.js";
import {
  openPopup,
  closePopup,
  closePopupByOverlay,
} from "./components/modal.js";

// @todo: DOM узлы
const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");
const editPopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close");
const formElement = editPopup.querySelector("form");
const nameInput = formElement.querySelector('input[name="name"]');
const descriptionInput = formElement.querySelector('input[name="description"]');
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const newCardForm = document.querySelector('.popup__form[name="new-place"]');
const cardTitleInput = newCardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = newCardForm.querySelector(".popup__input_type_url");

export {
  cardTemplate,
  imagePopup,
  editPopup,
  nameInput,
  descriptionInput,
  profileTitle,
  profileDescription,
  cardTitleInput,
  cardLinkInput,
  placesList,
  newCardPopup,
  newCardForm,
};

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

// Функция обработки сабмита формы редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const descriptionValue = descriptionInput.value;
  profileTitle.textContent = nameValue;
  profileDescription.textContent = descriptionValue;
  closePopup(editPopup);
}

// Функция обработки сабмита формы добавления новой карточки
function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  const titleValue = cardTitleInput.value;
  const linkValue = cardLinkInput.value;
  const newCardData = { name: titleValue, link: linkValue };
  const newCardElement = createCard(newCardData, deleteCard, openImageClick, likeCard);
  placesList.prepend(newCardElement);
  closePopup(newCardPopup);
  newCardForm.reset();
}

// Вывод карточек на страницу
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, deleteCard, openImageClick, likeCard);
  placesList.appendChild(cardElement);
});

editButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(editPopup);
});

addButton.addEventListener("click", () => openPopup(newCardPopup));

closeButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const popup = event.target.closest(".popup");
    closePopup(popup);
  });
});

window.addEventListener("click", (event) =>
  closePopupByOverlay(event, closePopup)
);

formElement.addEventListener("submit", handleProfileFormSubmit);
newCardForm.addEventListener("submit", handleNewCardFormSubmit);
