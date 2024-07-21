export { createCard, deleteCard };
import { cardTemplate, imagePopup } from "../index.js";
import { openPopup } from "./modal.js";

// @todo: Функция создания карточки

function createCard(cardData, deleteCallback, imageOpenClick, cardLikeActive) {
  const cardElement = cardTemplate.cloneNode(true).querySelector(".card");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

    function imageOpenClick () {
      openPopup(imagePopup);
      const popupImage = imagePopup.querySelector(".popup__image");
      const popupCaption = imagePopup.querySelector(".popup__caption");
  
      popupImage.src = cardData.link;
      popupImage.alt = cardData.name;
      popupCaption.textContent = cardData.name;
    }
  cardImage.addEventListener("click", imageOpenClick);

  function cardLikeActive (evt) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
  
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", cardLikeActive);

  deleteButton.addEventListener("click", () => {
    deleteCallback(cardElement);
  });

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}
