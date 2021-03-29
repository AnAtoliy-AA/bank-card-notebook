import {BANK_CARDS_IN_LOCAL_STORAGE } from '../shared/const'

export const getBankCardsFromLocalStorage = () => {
    if (!localStorage.getItem(BANK_CARDS_IN_LOCAL_STORAGE)) { localStorage.setItem(BANK_CARDS_IN_LOCAL_STORAGE, JSON.stringify([]))};
    return JSON.parse(localStorage.getItem(BANK_CARDS_IN_LOCAL_STORAGE ));
}

export const addBankCardToLocalStorage = (bankCard) => {
    const bankCardsInLocalStorage = JSON.parse(
        localStorage.getItem(BANK_CARDS_IN_LOCAL_STORAGE)
      );
      bankCardsInLocalStorage.push(bankCard);
      localStorage.setItem(
        BANK_CARDS_IN_LOCAL_STORAGE,
        JSON.stringify(bankCardsInLocalStorage)
      );
}