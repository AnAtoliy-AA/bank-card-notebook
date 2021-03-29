import {BANK_CARDS_IN_LOCAL_STORAGE } from '../shared/const'
export default class BankCard {
    constructor(cardNumber, cardComment, cardType) {
        this.cardNumber = cardNumber;
        this.cardComment = cardComment;
        this.cardType = cardType;
    }

    createDomBankCard() {
        const domBankCard = document.createElement('div');
        const domBankCardNumber = document.createElement('p');
        const domBankCardComment = document.createElement('p');
        const domBankCardType = document.createElement('p');
        const deleteBankCardButton = document.createElement('button');
        
        domBankCardNumber.innerHTML = this.cardNumber;
        domBankCardComment.innerHTML = this.cardComment || 'no comments';
        domBankCardType.innerHTML = this.cardType;
        deleteBankCardButton.innerHTML = 'delete';

        deleteBankCardButton.addEventListener('click',() => this.deleteBankCardFromLocalStorage(this.cardNumber))
        
        domBankCard.appendChild(domBankCardNumber);
        domBankCard.appendChild(domBankCardComment);
        domBankCard.appendChild(domBankCardType);
        domBankCard.appendChild(deleteBankCardButton);
        
        return domBankCard;
    }

    deleteBankCardFromLocalStorage(bankCardNumber) {
        const bankCardsInLocalStorage = JSON.parse(localStorage.getItem(BANK_CARDS_IN_LOCAL_STORAGE))
        const filteredBankCardsInLocalStorage = bankCardsInLocalStorage.filter((bankCard) => {
            return bankCard.cardNumber != bankCardNumber
        });
        localStorage.setItem(
          BANK_CARDS_IN_LOCAL_STORAGE,
          JSON.stringify(filteredBankCardsInLocalStorage)
        );
    }
}