import BankCardNoteBook from './script/BankCardNoteBook';
import './styles/main.scss';
import BANK_CARDS_IN_LOCAL_STORAGE, { getBankCardsFromLocalStorage } from "./utilities/utilities"

const createApp = () => {
  getBankCardsFromLocalStorage();
    new BankCardNoteBook();
}

createApp();
