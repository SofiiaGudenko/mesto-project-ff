export function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);

  forms.forEach((form) => {
    const inputs = Array.from(form.querySelectorAll(config.inputSelector));
    const submitButton = form.querySelector(config.submitButtonSelector);

    toggleButtonState(inputs, submitButton, config);

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        checkInputValidity(form, input, config);
        toggleButtonState(inputs, submitButton, config);
      });
    });
  });
}

function checkInputValidity(form, input, config) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  if (input.validity.valid) {
    hideInputError(input, errorElement, config);
  } else {
    showInputError(input, errorElement, config);
  }
}

function showInputError(input, errorElement, config) {
  input.classList.add(config.inputErrorClass);
  errorElement.textContent = input.validationMessage;
  errorElement.classList.add(config.errorClass);
}

function hideInputError(input, errorElement, config) {
  input.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
}

function toggleButtonState(inputs, button, config) {
  if (Array.from(inputs).every((input) => input.validity.valid)) {
    button.classList.remove(config.inactiveButtonClass);
    button.disabled = false;
  } else {
    button.classList.add(config.inactiveButtonClass);
    button.disabled = true;
  }
}

export function clearValidation(form, config) {
  const inputs = form.querySelectorAll(config.inputSelector);
  const submitButton = form.querySelector(config.submitButtonSelector);

  inputs.forEach((input) => {
    const errorElement = form.querySelector(`.${input.id}-error`);
    hideInputError(input, errorElement, config);
  });

  toggleButtonState(inputs, submitButton, config);
}
