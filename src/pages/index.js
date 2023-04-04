import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { openModal, closeModal } from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage";

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
  imageURLInput,
} from "../utils/constant.js";

const popupWithImage = new PopupWithImage("#preview-image-modal");

function createCard(cardData) {
  const card = new Card(
    { name: cardData.name, link: cardData.link },
    "#card-template",
    ({ name, link }) => {
      popupWithImage.open(name, link);
    }
  );

  return card.getView();
}

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
