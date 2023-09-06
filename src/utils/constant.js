export const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

export const cardsWrap = document.querySelector(".cards__list");
export const profileEditButton = document.querySelector("#profile-edit-button");
export const profileEditModal = document.querySelector("#profile-edit-modal");
export const profileEditCloseButton = profileEditModal.querySelector(
  ".modal__close-button"
);
export const profileEditForm = document.querySelector("#edit-profile-form");
export const profileTitle = ".profile__title";
export const profileDescription = ".profile__description";
export const cardListEl = document.querySelector(".cards__list");
//
export const profileAddButton = document.querySelector(".profile__add-button");
export const placeAddModal = document.querySelector("#place-add-modal");
export const placeAddCloseButton = placeAddModal.querySelector(
  ".modal__close-button"
);
export const addPlaceForm = document.querySelector("#add-place-form");
export const addPlaceSubmitButton = addPlaceForm.querySelector(".form__button");
//
export const previewImageModal = document.querySelector("#preview-image-modal");
export const previewImageCloseButton = previewImageModal.querySelector(
  ".modal__close-button"
);
export const previewImage = document.querySelector(".modal__image");
export const previewModalCaption = document.querySelector(".modal__caption");

//
export const profileTitleInput = document.querySelector("#profile-title-input");
export const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
export const placeTitleInput = document.querySelector("#place-title-input");
export const imageURLInput = document.querySelector("#image-url-input");
//

export const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

export const validationSettings = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
};
