import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, handleConfirm }) {
    super({ popupSelector });
    this._confirmButton = this._popupElement.querySelector(".modal__button");
    this._handleConfirm = handleConfirm;
  }

  open(card, cardId) {
    super.open();
    this._card = card;
    this._cardId = cardId;
  }

  setEventListeners() {
    super.setEventListeners();

    this._confirmButton.addEventListener("click", () => {
      this._handleConfirm(this._card, this._cardId).then(() => {
        this.close();
      });
    });
  }
}
