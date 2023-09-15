import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

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
  modalEditAvatar,
  profileDescriptionInput,
  profileDescription,
  profileImage,
  placeTitleInput,
  imageURLInput,
  validationSettings,
} from "../utils/constant.js";

import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "e1bd6119-1778-4022-8116-9e8cc4e0d599",
    "content-type": "application/json",
  },
});

const userInfo = new UserInfo({
  nameSelector: profileTitle,
  jobSelector: profileDescription,
  imageSelector: profileImage,
});

const editAvatarPopup = new PopupWithForm("#modal-edit-avatar", (data) => {
  return api
    .updateAvatar(data)
    .then((res) => {
      userInfo.setUserInfo(res);
    })
    .catch((error) => {
      console.error(error);
    });
});
editAvatarPopup.setEventListeners();

document
  .querySelector("#profile-image-pencil")
  .addEventListener("click", () => {
    editAvatarPopup.open();
    editAvatarFormValidator.resetValidation();
  });

const confirmAction = (card, cardId) => {
  return api
    .deleteCard(cardId)
    .then(() => {
      card.removeCard();
    })
    .catch((error) => {
      console.error(error);
    });
};

const deleteCardPopup = new PopupWithConfirmation({
  popupSelector: "#delete-card-modal",
  handleConfirm: confirmAction,
});

deleteCardPopup.setEventListeners();

const addCardPopup = new PopupWithForm("#place-add-modal", (cardData) => {
  return api
    .addCard(cardData)
    .then((res) => {
      console.log(res);
      renderCard(res);
    })
    .catch((error) => {
      console.error(error);
    });
});
addCardPopup.setEventListeners();

const popupWithImage = new PopupWithImage("#preview-image-modal");

const renderCard = (data) => {
  const cardElement = new Card(
    {
      data: data,
      handleImageClick: (imageData) => {
        popupWithImage.open(imageData.name, imageData.link);
      },
      handleDeleteCard: (card, cardId) => {
        deleteCardPopup.open(card, cardId);
      },
      confirmPopup: deleteCardPopup,
      api: api,
    },
    "#card-template"
  );

  section.addItem(cardElement.getView());
};

const section = new Section(
  {
    renderer: renderCard,
  },
  ".cards__list"
);

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    section.renderItems(cards);
  })
  .catch((error) => {
    console.error(error);
  });

const editProfilePopup = new PopupWithForm("#profile-edit-modal", (data) => {
  return api
    .updateUserInfo(data)
    .then((res) => {
      userInfo.setUserInfo(res);
    })
    .catch((error) => {
      console.error(error);
    });
});
editProfilePopup.setEventListeners();

popupWithImage.setEventListeners();

profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.name;
  profileDescriptionInput.value = userData.job;
  editProfilePopup.open();
});

profileAddButton.addEventListener("click", () => {
  addFormValidator.disableSubmitBtn();
  addCardPopup.open();
});

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditModal
);

const addFormValidator = new FormValidator(validationSettings, placeAddModal);

const editAvatarFormValidator = new FormValidator(
  validationSettings,
  modalEditAvatar
);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
editAvatarFormValidator.enableValidation();
