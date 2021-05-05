import BankCardNoteBook from "./script/BankCardNoteBook";
import "./styles/main.scss";
import { checkNewUserCardsInLocalStorage } from "./utilities/utilities";

const createApp = () => {
  checkNewUserCardsInLocalStorage();
  new BankCardNoteBook();
};

createApp();
