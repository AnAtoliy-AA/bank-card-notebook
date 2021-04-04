import BankCardForm from "./BankCardForm";
import { BANK_CARDS_IN_LOCAL_STORAGE, DEFAULT_VALUES } from "../shared/const";
import BankCard from "./BankCard";
import "../styles/bank-card-notebook.scss";

const ELEMENT_NAMES = {
  MAIN_ROOT_ID: "root",
  BANK_CARD_CONTAINER_CLASS: "bank-card-container",
  CREATE_DIV: "div",
  CREATE_H1: "h1",
  HEADER_TEXT: "Bank Card Notebook",
  HEADER_CLASS: "notebook-header"
};
export default class BankCardNoteBook {
  constructor(bankCardsArray) {
    this.mainRoot = document.getElementById(ELEMENT_NAMES.MAIN_ROOT_ID);
    this.bankCardsArray = bankCardsArray;
    this.createDomHeader();
    this.createBankCardForm();
    this.createBankCardsContainer();
    this.createDomBankCardsFromLocalStorage();
  }

  createBankCardsContainer() {
    const bankCardsContainer = document.createElement(ELEMENT_NAMES.CREATE_DIV);

    bankCardsContainer.classList.add(ELEMENT_NAMES.BANK_CARD_CONTAINER_CLASS);
    this.mainRoot.appendChild(bankCardsContainer);
  }

  createDomHeader() {
    const domHeader = document.createElement(ELEMENT_NAMES.CREATE_H1);

    domHeader.classList.add(ELEMENT_NAMES.HEADER_CLASS);
    domHeader.innerHTML = ELEMENT_NAMES.HEADER_TEXT;

    this.mainRoot.appendChild(domHeader);
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

