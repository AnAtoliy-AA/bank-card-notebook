import BankCardNoteBook from './script/BankCardNoteBook';
import './styles/main.scss';
import { getBankCardsFromLocalStorage } from './utilities/utilities'

const createApp = () => {
    const bankCardsArray = getBankCardsFromLocalStorage();
    new BankCardNoteBook(bankCardsArray);
}

createApp();
