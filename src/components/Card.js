// const previewImageModal = document.querySelector("#preview-image-modal");
// const previewModalCaption = previewImageModal.querySelector(".modal__caption");
// const previewImage = previewImageModal.querySelector(".modal__image");

class Card {
  constructor({ name, link }, cardTemplate, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardTemplate = cardTemplate;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardTemplate)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  // _setEventListeners() {
  //   this._likeButton.addEventListener("click", this._handleLikeIcon);

  //   this._deleteButton.addEventListener("click", () => {
  //     this._handleDeleteCard({ name: this._name, link: this._link });
  //   });

  //   this._cardImage.addEventListener("click", () => {
  //     this._handleImageClick({ name: this._name, link: this._link });
  //   });
  // }

  _setEventListeners() {
    this._cardImage.addEventListener("click", () =>
      this._handleImageClick(this._name, this._link)
    );
    this._cardDeleteButton.addEventListener("click", this._handleDeleteCard);
    this._likeButton.addEventListener("click", this._handleLikeIcon);
  }

  _openImageModal() {
    this._handleImageClick(this._name, this._link);
  }

  _handleLikeIcon = () => {
    this._likeButton.classList.toggle("card__like-button_active");
  };

  _handleDeleteCard = () => {
    this._cardElement.remove();
  };

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();

    this.cardImage.addEventListener("click", () => {
      previewImage.src = this._link;
      previewImage.alt = this._name;
      previewModalCaption.textContent = this._name;
      openModal(previewImageModal);
    });

    return this._cardElement;
  }
}

export default Card;