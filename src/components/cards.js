export { initialCards, createCard, deleteCard };
import { cardTemplate, imagePopup } from "../index.js";
import { openPopup } from "./modal.js";

const arhizImage = new URL(
  "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  import.meta.url
);
const chelyabinskImage = new URL(
  "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  import.meta.url
);
const ivanovoImage = new URL(
  "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  import.meta.url
);
const kamchatkaImage = new URL(
  "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  import.meta.url
);
const holmogorskImage = new URL(
  "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  import.meta.url
);
const baikalImage = new URL(
  "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  import.meta.url
);

const initialCards = [
  {
    name: "Архыз",
    link: arhizImage,
  },
  {
    name: "Челябинская область",
    link: chelyabinskImage,
  },
  {
    name: "Иваново",
    link: ivanovoImage,
  },
  {
    name: "Камчатка",
    link: kamchatkaImage,
  },
  {
    name: "Холмогорский район",
    link: holmogorskImage,
  },
  {
    name: "Байкал",
    link: baikalImage,
  },
];

// @todo: Функция создания карточки

function createCard(cardData, deleteCallback) {
  const cardElement = cardTemplate.cloneNode(true).querySelector(".card");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  cardImage.addEventListener("click", () => {
    openPopup(imagePopup);
    const popupImage = imagePopup.querySelector(".popup__image");
    const popupCaption = imagePopup.querySelector(".popup__caption");

    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name;
  });

  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("card__like-button_is-active");
    });

  deleteButton.addEventListener("click", () => {
    deleteCallback(cardElement);
  });

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}
