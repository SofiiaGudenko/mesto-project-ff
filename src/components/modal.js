const closePopupByOverlay = (event, closePopup) => {
  if (event.target && event.target.classList.contains("popup")) {
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

export { openPopup, closePopup, closePopupByOverlay };
