class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
    document.addEventListener("mousedown", this._handleOverlay);
  }

  close() {
    this._popup.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    document.removeEventListener("mousedown", this._handleOverlay);
  }

  _handleEscClose = (e) => {
    if (e.key === "Escape") {
      this.close();
    }
  };

  _handleOverlay = (e) => {
    if (e.target.classList.contains("modal_opened")) {
      this.close();
    }
  };

  setEventListeners() {
    this._popup.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("modal__close")) {
        this.close();
      }
    });
  }
}

export default Popup;

// I had this on utils.js:

// function closeModalByEscape(e) {
//   if (e.key === "Escape") {
//     const openModal = document.querySelector(".modal_opened");
//     closeModal(openModal);
//   }
// }

// export function closeModal(modal) {
//   document.removeEventListener("keydown", closeModalByEscape);
//   modal.removeEventListener("mousedown", closeModalOnRemoteClick);

//   modal.classList.remove("modal_opened");
// }

// export function openModal(modal) {
//   modal.addEventListener("mousedown", closeModalOnRemoteClick);

//   document.addEventListener("keydown", closeModalByEscape);
//   modal.classList.add("modal_opened");
// }

// export function closeModalOnRemoteClick(evt) {
//   if (evt.target === evt.currentTarget) {
//     closeModal(evt.target);
//   }
// }
