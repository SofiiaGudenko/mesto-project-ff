export {
  openPopup,
  closePopup,
  keyHandler,
  handleFormSubmit,
  handleNewCardFormSubmit,
};
import {
  popups,
  imagePopup,
  nameInput,
  editPopup,
  descriptionInput,
  profileTitle,
  profileDescription,
  cardTitleInput,
  cardLinkInput,
  placesList,
  newCardPopup,
  newCardForm,
} from "../index.js";
import { createCard, deleteCard } from "./card.js";

// Функция открытия попапа
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", keyHandler);
}

// Функции закрытия попапа
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", keyHandler);
}

function keyHandler(evt) {
  if (evt.key === "Escape") {
    popups.forEach((popup) => {
      closePopup(popup);
    });
  }
}

// Редактирование имени и информации о себе
function handleFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const descriptionValue = descriptionInput.value;

  profileTitle.textContent = nameValue;
  profileDescription.textContent = descriptionValue;

  closePopup(editPopup);
}

//Форма добавления карточки
function handleNewCardFormSubmit(evt) {
  evt.preventDefault();

  const titleValue = cardTitleInput.value;
  const linkValue = cardLinkInput.value;

  const newCardData = { name: titleValue, link: linkValue };
  const newCardElement = createCard(newCardData, deleteCard);

  placesList.prepend(newCardElement);
  closePopup(newCardPopup);
  newCardForm.reset();
}
