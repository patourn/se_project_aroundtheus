import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });

    this._form = this._popupElement.querySelector(".form");
    this._handleFormSubmit = handleFormSubmit;
    this._formInputs = this._popupElement.querySelectorAll(".form__input");

    this._submitButton = this._popupElement.querySelector(".form__button");
    this._submitButtonText = this._submitButton.textContent;
  }

  renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  close() {
    this._form.reset();
    super.close();
  }

  _getInputValues() {
    const inputValues = {};

    this._formInputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.renderLoading(true);
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues)
        .then(() => {
          this.close();
        })
        .finally(() => {
          this.renderLoading(false);
        });
    });
  }
}

export default PopupWithForm;
