import "./pages/index.css";
import { createCard } from "./components/card.js";
import {
  openPopup,
  closePopup,
  closePopupByOverlay,
} from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getUserInfo,
  getInitialCards,
  updateUserInfo,
  updateAvatar,
  addCard,
  apiDeleteCard,
  toggleLike,
} from "./components/api.js";

// @todo: DOM узлы
const elements = {
  cardTemplate: document.querySelector("#card-template").content,
  placesList: document.querySelector(".places__list"),
  editPopup: document.querySelector(".popup_type_edit"),
  newCardPopup: document.querySelector(".popup_type_new-card"),
  imagePopup: document.querySelector(".popup_type_image"),
  avatarUpdatePopup: document.querySelector(".popup_type_avatar-update"),
  editButton: document.querySelector(".profile__edit-button"),
  addButton: document.querySelector(".profile__add-button"),
  avatarImage: document.querySelector(".profile__image"),
  avatarEdit: document.querySelector(".profile__edit-icon"),
  closeButtons: document.querySelectorAll(".popup__close"),
  formElement: document.querySelector(".popup_type_edit form"),
  nameInput: document.querySelector(".popup_type_edit input[name='name']"),
  descriptionInput: document.querySelector(
    ".popup_type_edit input[name='description']"
  ),
  profileTitle: document.querySelector(".profile__title"),
  profileDescription: document.querySelector(".profile__description"),
  newCardForm: document.querySelector('.popup__form[name="new-place"]'),
  cardTitleInput: document.querySelector(
    '.popup__form[name="new-place"] .popup__input_type_card-name'
  ),
  cardLinkInput: document.querySelector(
    '.popup__form[name="new-place"] .popup__input_type_url'
  ),
  avatarUpdateForm: document.querySelector(
    '.popup_type_avatar-update form[name="avatar-update"]'
  ),
  avatarInput: document.querySelector(
    ".popup_type_avatar-update #avatar-input"
  ),
};

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Включение валидации
enableValidation(validationConfig);

function openAvatarUpdatePopup() {
  clearValidation(elements.avatarUpdatePopup, validationConfig);
  elements.avatarInput.value = "";
  openPopup(elements.avatarUpdatePopup);
}

document.addEventListener("click", function (event) {
  if (
    event.target === elements.avatarEdit ||
    event.target === elements.avatarImage
  ) {
    openAvatarUpdatePopup();
  }
});

function openImageClick(cardData) {
  openPopup(elements.imagePopup);
  const popupImage = elements.imagePopup.querySelector(".popup__image");
  const popupCaption = elements.imagePopup.querySelector(".popup__caption");
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
}

function likeCard(cardId, likeButton, likeCount) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  const likeButtonState = !isLiked;

  toggleLike(cardId, likeButtonState)
    .then((updatedCard) => {
      likeButton.classList.toggle("card__like-button_is-active");
      likeCount.textContent = updatedCard.likes.length;
    })
    .catch((err) => console.error("Error updating like:", err));
}

let userId;

function updateUserProfile(userData) {
  elements.profileTitle.textContent = userData.name;
  elements.profileDescription.textContent = userData.about;
  elements.avatarImage.style.backgroundImage = `url(${userData.avatar})`;
  userId = userData._id;
}

function renderCards(cards) {
  cards.forEach((cardData) => {
    const cardElement = createCard(
      cardData,
      apiDeleteCard,
      openImageClick,
      likeCard,
      userId
    );
    elements.placesList.append(cardElement);
  });
}

function setButtonState(button, isLoading) {
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const updatedUserData = {
    name: elements.nameInput.value,
    about: elements.descriptionInput.value,
  };
  const saveButton = elements.formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  setButtonState(saveButton, true);

  updateUserInfo(updatedUserData)
    .then((userData) => {
      updateUserProfile(userData);
      closePopup(elements.editPopup);
    })
    .catch((err) => console.error("Error updating profile:", err))
    .finally(() => setButtonState(saveButton, false));
}

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  const newCardData = {
    name: elements.cardTitleInput.value,
    link: elements.cardLinkInput.value,
  };
  const saveButton = elements.newCardForm.querySelector(
    validationConfig.submitButtonSelector
  );

  setButtonState(saveButton, true);

  addCard(newCardData)
    .then((cardData) => {
      const cardElement = createCard(
        cardData,
        apiDeleteCard,
        openImageClick,
        likeCard,
        userId
      );
      elements.placesList.prepend(cardElement);
      closePopup(elements.newCardPopup);
    })
    .catch((err) => console.error("Error adding new card:", err))
    .finally(() => setButtonState(saveButton, false));
}

function handleAvatarUpdateFormSubmit(evt) {
  evt.preventDefault();
  const newAvatarData = { avatar: elements.avatarInput.value };
  const saveButton = elements.avatarUpdateForm.querySelector(
    validationConfig.submitButtonSelector
  );

  setButtonState(saveButton, true);

  updateAvatar(newAvatarData)
    .then((userData) => {
      updateUserProfile(userData);
      closePopup(elements.avatarUpdatePopup);
    })
    .catch((err) => console.error("Error updating avatar:", err))
    .finally(() => setButtonState(saveButton, false));
}

elements.editButton.addEventListener("click", () => {
  elements.nameInput.value = elements.profileTitle.textContent;
  elements.descriptionInput.value = elements.profileDescription.textContent;
  clearValidation(elements.formElement, validationConfig);
  openPopup(elements.editPopup);
});

elements.addButton.addEventListener("click", () => {
  elements.newCardForm.reset();
  clearValidation(elements.newCardForm, validationConfig);
  openPopup(elements.newCardPopup);
});

elements.closeButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const popup = event.target.closest(".popup");
    closePopup(popup);
  });
});

window.addEventListener("click", (event) =>
  closePopupByOverlay(event, closePopup)
);

elements.formElement.addEventListener("submit", handleProfileFormSubmit);
elements.newCardForm.addEventListener("submit", handleNewCardFormSubmit);
elements.avatarUpdateForm.addEventListener(
  "submit",
  handleAvatarUpdateFormSubmit
);

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cardsData]) => {
    updateUserProfile(userData);
    renderCards(cardsData);
  })
  .catch((err) => console.error("Error loading data:", err));
