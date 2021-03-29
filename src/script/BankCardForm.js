import BankCard from "./BankCard";
import {BANK_CARDS_IN_LOCAL_STORAGE } from '../shared/const';

export default class BankCardForm {
    constructor() {
        this.createBankCardForm()
    }

    createBankCardForm() {
        const bankCardForm = document.createElement('form');
        const bankCardFormInput = document.createElement('input');
        const banCardFormButton = document.createElement('button');

        bankCardFormInput.addEventListener('change',(event) =>this.onCardNumberInputChange(event.target.value))
        bankCardForm.addEventListener('submit', (event) => this.handleBankCardFormSubmit(event))

        bankCardForm.appendChild(bankCardFormInput);
        bankCardForm.appendChild(banCardFormButton);

        return bankCardForm;
    }

    onCardNumberInputChange(value) {
        // console.log(value);
    }

    handleBankCardFormSubmit(event) {
        event.preventDefault();
        const isCardValid = this.checkCardValidation(event.target[0].value)
        console.log(isCardValid);
        const bankCard = new BankCard(event.target[0].value);
        const bankCardsInLocalStorage = JSON.parse(localStorage.getItem(BANK_CARDS_IN_LOCAL_STORAGE))
        bankCardsInLocalStorage.push(bankCard)
        localStorage.setItem(BANK_CARDS_IN_LOCAL_STORAGE, JSON.stringify(bankCardsInLocalStorage));
        console.log(bankCardsInLocalStorage);
        const bankCardContainer = document.querySelector('.bank-card-container');
        bankCardContainer.appendChild(bankCard.createBankCard())
    }
    //https://overcoder.net/q/359800/%D1%80%D0%B5%D0%B0%D0%BB%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D1%8F-%D0%B0%D0%BB%D0%B3%D0%BE%D1%80%D0%B8%D1%82%D0%BC%D0%B0-%D0%BB%D1%83%D0%BD%D0%B0
    checkCardValidation(cardNumber) {
       // cardNumber as a string w/ digits only
            let digit = 0, even = false; // even = n-th digit counted from the end
            return ( cardNumber.split("").reverse().reduce(
                         (string,digitInStr) => { digit = parseInt(digitInStr); // reduce arg-0 - callback fnc
                             return (string + ((even = !even) ? digit : [0,2,4,6,8,1,3,5,7,9][digit]));
                           } // /end of callback fnc
                        ,0 // reduce arg-1 - prev value for first iteration (sum)
                        ) % 10 === 0
                   );
          }
    
} 