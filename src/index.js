import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import { createCard, deleteCard } from "./components/card.js";
import {
  openPopup,
  closePopup,
  keyHandler,
  handleFormSubmit,
  handleNewCardFormSubmit,
} from "./components/modal.js";
export {
  cardTemplate,
  imagePopup,
  popups,
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

// @todo: DOM узлы

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");
const popups = document.querySelectorAll(".popup");
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
const cardTitleInput = newCardForm.querySelector(
  ".popup__input_type_card-name"
);
const cardLinkInput = newCardForm.querySelector(".popup__input_type_url");

// @todo: Вывести карточки на страницу
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, deleteCard);
  placesList.appendChild(cardElement);
});

editButton.addEventListener("click", () => openPopup(editPopup));
addButton.addEventListener("click", () => openPopup(newCardPopup));

closeButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const popup = event.target.closest(".popup");
    closePopup(popup);
  });
});

window.addEventListener("click", (event) => {
  popups.forEach((popup) => {
    if (event.target === popup) {
      closePopup(popup);
    }
  });
});

formElement.addEventListener("submit", handleFormSubmit);

newCardForm.addEventListener("submit", handleNewCardFormSubmit);
