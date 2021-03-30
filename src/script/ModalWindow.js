import "../styles/modal-window.scss";
import { deleteBankCardFromLocalStorage } from "../utilities/utilities";

export default class ModalWindow {
  constructor(cardNumber, domBankCard) {
    this.createModalWindow(cardNumber, domBankCard);
  }

  createModalWindow(cardNumber, domBankCard) {
    const modalWindow = document.createElement("div");
    const modalControlsContainer = document.createElement("div");
    const agreeDeleteButton = document.createElement("button");
    const cancelDeleteButton = document.createElement("button");

    modalWindow.classList.add("modal-window");
    modalControlsContainer.classList.add("controls-container");

    agreeDeleteButton.innerHTML = "agree";
    cancelDeleteButton.innerHTML = "cancel";
    modalWindow.innerHTML = `Are you sure you want to delete ${cardNumber}?`;

    agreeDeleteButton.classList.add("button", "button_danger");
    cancelDeleteButton.classList.add("button", "button_save");

    agreeDeleteButton.addEventListener("click", () =>
      this.deleteBankCard(cardNumber, domBankCard, modalWindow)
    );
    cancelDeleteButton.addEventListener("click", () => modalWindow.remove());

    const mainRoot = document.getElementById("root");
    modalControlsContainer.appendChild(agreeDeleteButton);
    modalControlsContainer.appendChild(cancelDeleteButton);
    modalWindow.appendChild(modalControlsContainer);

    mainRoot.appendChild(modalWindow);
  }

  deleteBankCard(cardNumber, domBankCard, modalWindow) {
    deleteBankCardFromLocalStorage(cardNumber);
    domBankCard.remove();
    modalWindow.remove();
  }
}
