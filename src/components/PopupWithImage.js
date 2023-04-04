import Popup from "./Popup.js"; //child of Popup

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
  }

  open(name, link) {
    this._image = this._popupElement.querySelector(".modal__image");
    this._popupElement.querySelector(".modal__caption").textContent = name;
    this._image.src = link;
    this._image.alt = name;
    super.open();
  }
}
