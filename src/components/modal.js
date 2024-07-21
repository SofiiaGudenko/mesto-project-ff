export {
  openPopup,
  closePopup,
  handleProfileFormSubmit,
  handleNewCardFormSubmit,
  closePopupByOverlay,
};

const closePopupByOverlay = (event, closePopup) => {
  if (event.target && event.target.classList.contains('popup')) {
    closePopup(event.target);
  }
};

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
      const openedPopup = document.querySelector(".popup_is-opened");
      if (openedPopup) {
        closePopup(openedPopup);
      }
    }
}

// Редактирование имени и информации о себе
function handleProfileFormSubmit(evt, nameInput, descriptionInput, profileTitle, profileDescription, editPopup, closePopup) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const descriptionValue = descriptionInput.value;
  profileTitle.textContent = nameValue;
  profileDescription.textContent = descriptionValue;
  closePopup(editPopup);
}

// Форма добавления карточки
function handleNewCardFormSubmit(evt, cardTitleInput, cardLinkInput, createCard, deleteCard, placesList, newCardPopup, newCardForm, closePopup) {
  evt.preventDefault();
  const titleValue = cardTitleInput.value;
  const linkValue = cardLinkInput.value;
  const newCardData = { name: titleValue, link: linkValue };
  const newCardElement = createCard(newCardData, deleteCard);
  placesList.prepend(newCardElement);
  closePopup(newCardPopup);
  newCardForm.reset();
}