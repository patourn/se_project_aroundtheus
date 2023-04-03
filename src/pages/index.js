import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { openModal, closeModal } from "../components/Popup.js";

import {
  initialCards,
  profileEditForm,
  profileEditCloseButton,
  profileAddButton,
  placeAddCloseButton,
  previewImageCloseButton,
  addPlaceForm,
  profileEditButton,
  previewImageModal,
  cardsWrap,
  profileEditModal,
  placeAddModal,
  profileTitleInput,
  profileTitle,
  profileDescriptionInput,
  profileDescription,
  placeTitleInput,
  // previewImage,
  imageURLInput,
} from "../utils/constant.js";

// const initialCards = [
//   {
//     name: "Yosemite Valley",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
//   },
//   {
//     name: "Lake Louise",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
//   },
//   {
//     name: "Bald Mountains",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
//   },
//   {
//     name: "Latemar",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
//   },
//   {
//     name: "Vanoise National Park",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
//   },
//   {
//     name: "Lago di Braies",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
//   },
// ];

function createCard(cardData) {
  const card = new Card(
    { name: cardData.name, link: cardData.link },
    "#card-template"
  );

  return card.getView();
}

const cardSelector = "#card-template";

//Elements and Wrappers//

// const cardsWrap = document.querySelector(".cards__list");
// const profileEditButton = document.querySelector("#profile-edit-button");
// const profileEditModal = document.querySelector("#profile-edit-modal");
// const profileEditCloseButton = profileEditModal.querySelector(
//   ".modal__close-button"
// );
// const profileEditForm = document.querySelector("#edit-profile-form");
// const profileTitle = document.querySelector(".profile__title");
// const profileDescription = document.querySelector(".profile__description");
// const cardListEl = document.querySelector(".cards__list");
// //
// const profileAddButton = document.querySelector(".profile__add-button");
// const placeAddModal = document.querySelector("#place-add-modal");
// const placeAddCloseButton = placeAddModal.querySelector(".modal__close-button");
// const addPlaceForm = document.querySelector("#add-place-form");
// const addPlaceSubmitButton = addPlaceForm.querySelector(".form__button");
// //
// const previewImageModal = document.querySelector("#preview-image-modal");
// const previewImageCloseButton = previewImageModal.querySelector(
//   ".modal__clse-button"
// );
// const previewImage = document.querySelector(".modal__image");
// const previewModalCaption = document.querySelector(".modal__caption");

// //
// const profileTitleInput = document.querySelector("#profile-title-input");
// const profileDescriptionInput = document.querySelector(
//   "#profile-description-input"
// );
// const placeTitleInput = document.querySelector("#place-title-input");
// const imageURLInput = document.querySelector("#image-url-input");
// //

// const cardTemplate =
//   document.querySelector("#card-template").content.firstElementChild;

//

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardsWrap.prepend(cardElement);
}

function handleProfileEditForm(event) {
  event.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleProfileAddButton(event) {
  event.preventDefault();
  const name = placeTitleInput.value;
  const link = imageURLInput.value;
  renderCard({ name, link }, cardsWrap);
  closeModal(placeAddModal);
  addPlaceForm.reset();
  addFormValidator.disableSubmitBtn();
}

function openImageModal(data) {
  previewImage.src = data.link;
  previewImage.alt = data.name;
  previewModalCaption.textContent = data.name;
  openModal(previewImageModal);
}

//Form Listeners//

profileEditForm.addEventListener("submit", handleProfileEditForm);
addPlaceForm.addEventListener("submit", handleProfileAddButton);

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});
profileEditCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);
profileAddButton.addEventListener("click", () => openModal(placeAddModal));
placeAddCloseButton.addEventListener("click", () => closeModal(placeAddModal));

previewImageCloseButton.addEventListener("click", () =>
  closeModal(previewImageModal)
);
//
initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));

//Validation//

const validationSettings = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
};

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditModal
);
const addFormValidator = new FormValidator(validationSettings, placeAddModal);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
