import BankCardForm from "./BankCardForm";
import { BANK_CARDS_IN_LOCAL_STORAGE, DEFAULT_VALUES } from "../shared/const";
import BankCard from "./BankCard";
import "../styles/bank-card-notebook.scss";

const ELEMENT_NAMES = {
  MAIN_ROOT_ID: "root",
  BANK_CARD_CONTAINER_CLASS: "bank-card-container",
  HTML_VIEWER_CONTAINER_ID: "htmlViewerContainerId",
  CREATE_DIV: "div",
};
export default class BankCardNoteBook {
  constructor() {
    this.mainRoot = document.getElementById(ELEMENT_NAMES.MAIN_ROOT_ID);
    this.createBankCardForm();
    this.createBankCardsContainer();
    this.createDomBankCardsFromLocalStorage();
  }

  createBankCardsContainer() {
    const bankCardsContainer = document.createElement(ELEMENT_NAMES.CREATE_DIV);

    bankCardsContainer.classList.add(ELEMENT_NAMES.BANK_CARD_CONTAINER_CLASS);
    this.mainRoot.appendChild(bankCardsContainer);
  }

  createBankCardForm() {
    const bankCardForm = new BankCardForm(
      this.createDomBankCardsFromLocalStorage
    );

    this.mainRoot.appendChild(bankCardForm.domBankCardForm);
  }

  createDomBankCardsFromLocalStorage() {
    const bankCardsInLocalStorage = JSON.parse(
      localStorage.getItem(BANK_CARDS_IN_LOCAL_STORAGE)
    );
    const bankCardContainer = document.querySelector(".bank-card-container");

    bankCardContainer.innerHTML = DEFAULT_VALUES.EMPTY;

    for (let key in bankCardsInLocalStorage) {
      const domCard = new BankCard(key, bankCardsInLocalStorage[key]);
      bankCardContainer.appendChild(domCard.createDomBankCard());
    }
  }
}

