import BankCardForm from './BankCardForm';
import {BANK_CARDS_IN_LOCAL_STORAGE } from '../shared/const'

const ELEMENT_NAMES = {
    MAIN_ROOT_ID: 'root',
    BANK_CARD_CONTAINER_CLASS: 'bank-card-container',
    HTML_VIEWER_CONTAINER_ID: 'htmlViewerContainerId',
    CREATE_DIV: 'div',
    CREATE_BUTTON: 'button',
}
export default class BankCardNoteBook {
    constructor() {
        this.mainRoot = document.getElementById(ELEMENT_NAMES.MAIN_ROOT_ID);
        this.createBankCardsContainer();
        this.createBankCardForm();
        this.createDomBankCardsFromLocalStorage();
    }

    createBankCardsContainer() {
        const bankCardsContainer = document.createElement(ELEMENT_NAMES.CREATE_DIV);

        bankCardsContainer.classList.add(ELEMENT_NAMES.BANK_CARD_CONTAINER_CLASS);
        this.mainRoot.appendChild(bankCardsContainer);
    }

    createBankCardForm() {
        const bankCardForm = new BankCardForm();

        this.mainRoot.appendChild(bankCardForm.createBankCardForm());
    }

    createDomBankCardsFromLocalStorage() {
        const bankCardsInLocalStorage = JSON.parse(localStorage.getItem(BANK_CARDS_IN_LOCAL_STORAGE))
        const bankCardContainer = document.querySelector('.bank-card-container');
        bankCardsInLocalStorage.map((card) => {
            const domCard = document.createElement('div');
            domCard.innerHTML = card.cardNumber;
            bankCardContainer.appendChild(domCard);
        })
    }
}