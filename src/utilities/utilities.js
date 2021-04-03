import { BANK_CARDS_IN_LOCAL_STORAGE } from "../shared/const";

export const getBankCardsFromLocalStorage = () => {
  if (!localStorage.getItem(BANK_CARDS_IN_LOCAL_STORAGE)) {
    localStorage.setItem(BANK_CARDS_IN_LOCAL_STORAGE, JSON.stringify({}));
  }

  return JSON.parse(localStorage.getItem(BANK_CARDS_IN_LOCAL_STORAGE));
};

export const addBankCardToLocalStorage = (bankCardNumber, bankCardComment) => {
  const bankCardsInLocalStorage = JSON.parse(
    localStorage.getItem(BANK_CARDS_IN_LOCAL_STORAGE)
  );

  bankCardsInLocalStorage[bankCardNumber] = bankCardComment;

  localStorage.setItem(
    BANK_CARDS_IN_LOCAL_STORAGE,
    JSON.stringify(bankCardsInLocalStorage)
  );
};

export const deleteBankCardFromLocalStorage = (bankCardNumber) => {
  const bankCardsInLocalStorage = JSON.parse(
    localStorage.getItem(BANK_CARDS_IN_LOCAL_STORAGE)
  );

  delete bankCardsInLocalStorage[bankCardNumber];

  localStorage.setItem(
    BANK_CARDS_IN_LOCAL_STORAGE,
    JSON.stringify(bankCardsInLocalStorage)
  );
};
