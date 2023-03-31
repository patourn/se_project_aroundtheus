import Popup from "./Popup.js"; //child of Popup

export default class PopupImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
  }

  open(name, link) {
    this._image = this._popup.querySelector("#preview-image-modal");

    this._popup.querySelector(".card__description").textContent = name;
    this._image.src = link;
    this._image.alt = name;
    super.open();
  }
}
