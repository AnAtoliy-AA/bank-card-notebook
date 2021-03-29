import BankCardNoteBook from './script/BankCardNoteBook';
import './styles/main.scss';
import {BANK_CARDS_IN_LOCAL_STORAGE } from './shared/const'

const createApp = (bankCardsArray) => {
    new BankCardNoteBook(bankCardsArray);

}

const getLevelFromLocalStorage = () => {
    if (!localStorage.getItem(BANK_CARDS_IN_LOCAL_STORAGE)) { localStorage.setItem(BANK_CARDS_IN_LOCAL_STORAGE, JSON.stringify([]))};
    const bankCardsArray = JSON.parse(localStorage.getItem(BANK_CARDS_IN_LOCAL_STORAGE ));
    createApp(bankCardsArray);
}

getLevelFromLocalStorage();