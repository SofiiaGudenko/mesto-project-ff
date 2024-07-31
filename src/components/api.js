const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-19",
  headers: {
    authorization: "c3e16638-d1ae-4564-9f96-44faba91d262",
    "Content-Type": "application/json",
  },
};

const handleResponse = (response) => {
  if (response.ok) {
    return response.json();
  } else {
    return response.json().then((error) => {
      return Promise.reject(
        `Ошибка ${response.status}: ${error.message || response.statusText}`
      );
    });
  }
};

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, { headers: config.headers })
    .then(handleResponse)
    .catch((err) => {
      console.error("Ошибка при получении информации о пользователе:", err);
    });
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, { headers: config.headers })
    .then(handleResponse)
    .catch((err) => {
      console.error("Ошибка при получении карточек:", err);
    });
};

export const updateUserInfo = (userData) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(userData),
  })
    .then(handleResponse)
    .catch((err) => {
      console.error("Ошибка при обновлении информации о пользователе:", err);
    });
};

export const updateAvatar = (avatarData) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(avatarData),
  })
    .then(handleResponse)
    .catch((err) => {
      console.error("Ошибка при обновлении аватара:", err);
    });
};

export const addCard = (cardData) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(cardData),
  })
    .then(handleResponse)
    .catch((err) => {
      console.error("Ошибка при добавлении новой карточки:", err);
    });
};

export const toggleLike = (cardId, like) => {
  const method = like ? "PUT" : "DELETE";
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method,
    headers: config.headers,
  })
    .then(handleResponse)
    .catch((err) => {
      console.error("Ошибка при обновлении лайка карточки:", err);
    });
};

// Функция для удаления карточки
export const apiDeleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(handleResponse)
    .catch((err) => {
      console.error("Ошибка при удалении карточки:", err);
    });
};
