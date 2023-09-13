class Card {
  constructor(
    { data, handleImageClick, handleDeleteCard, confirmPopup, api },
    cardTemplateSelector
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isLiked = data.isLiked;
    this._cardTemplate = cardTemplateSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCard = handleDeleteCard;
    this._confirmPopup = confirmPopup;
    this._api = api;
  }

  removeCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardTemplate)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _setLike() {
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    }
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", this._handleLikeIcon);

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteCard(this, this._id);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  _handleLikeIcon = () => {
    if (!this._isLiked) {
      this._api.likeCard(this._id).then(() => {
        this._likeButton.classList.add("card__like-button_active");
        this._isLiked = !this._isLiked;
      });
    } else {
      this._api
        .unlikeCard(this._id)
        .then(() => {
          this._likeButton.classList.remove("card__like-button_active");
          this._isLiked = !this._isLiked;
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  getView() {
    this._cardElement = this._getTemplate();
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
    this._setLike();

    return this._cardElement;
  }
}

export default Card;
