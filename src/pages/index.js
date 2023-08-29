import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api";

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
  profileImage,
  placeTitleInput,
  imageURLInput,
  validationSettings,
} from "../utils/constant.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

// fetch("https://around-api.en.tripleten-services.com/v1", {
//   headers: {
//     authorization: "a0e64b15-f650-40dc-a9b6-c992a9ed9b6b",
//   },
// })
//   .then((res) => res.json())
//   .then((result) => {
//     console.log(result);
//   });

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "e1bd6119-1778-4022-8116-9e8cc4e0d599",
    "content-type": "application/json",
  },
});

const editAvatarPopup = new PopupWithForm("#modal-edit-avatar", (data) => {
  return api.updateAvatar(data).then((res) => {
    userInfo.setUserInfo(res);
  })
  .catch((err) => {
    console.error(err);
  })
});
editAvatarPopup.setEventListeners();

document.querySelector(".profile__image").addEventListener("click", () => {
  editAvatarPopup.open();
});

const confirmAction = (card, cardId) => {
  return api.deleteCard(cardId).then(() => {
    card.removeCard();
  });
};

const deleteCardPopup = new PopupWithConfirmation({
  popupSelector: "#delete-card-modal",
  handleConfirm: confirmAction,
});

deleteCardPopup.setEventListeners();

// const initialApiCards = api.getInitialCards();

const addCardPopup = new PopupWithForm("#place-add-modal", (cardData) => {
  // const card = createCard(cardData);
  // section.addItem(card);
  // addCardPopup.close();
  // addFormValidator.disableSubmitBtn();
  // return api.addCard(cardData);

  return api.addCard(cardData).then((res) => {
    renderCard(res);
  });
});
addCardPopup.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: profileTitle,
  jobSelector: profileDescription,
  imageSelector: profileImage,
});

// const renderCard = (data) => {
//  const cardElement = new Card(
//    {
//      name: data.name,
//      link: data.link,
//    },
//    "#card-template",
//    ({ name, link }) => {
//      popupWithImage.open(name, link);
//    }
//  );
//  section.addItem(cardElement.getView());
// };

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

Promise.all([api.getUserInfo(), api.getInitialCards()]).then(
  ([userData, cards]) => {
    userInfo.setUserInfo(userData);
    section.renderItems(cards);
  }
);

//const section = new Section(
//  {
// items: initialCards,
// items: initialApiCards,
//   renderer: (cardData) => {
//    const card = createCard(cardData);
//    section.addItem(card);
//   },
//  },
//  ".cards__list"
//);

//const section = new Section(
//  {
//    renderer: renderCard,
//  },
//  ".cards__list"
//);
//section.renderItems(initialApiCards);

const editProfilePopup = new PopupWithForm("#profile-edit-modal", (data) => {
  return api.updateUserInfo(data).then((res) => {
    userInfo.setUserInfo(res);
  });
});
editProfilePopup.setEventListeners();

// const popupWithImage = new PopupWithImage("#preview-image-modal");
popupWithImage.setEventListeners();

// function createCard(cardData) {
//  const card = new Card(
//    { name: cardData.name, link: cardData.link },
//    "#card-template",
//    ({ name, link }) => {
//      popupWithImage.open(name, link);
//    }
//  );

//  return card.getView();
//}

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

editFormValidator.enableValidation();
addFormValidator.enableValidation();
