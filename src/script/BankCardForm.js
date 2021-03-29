import BankCard from "./BankCard";
import { BANK_CARDS_IN_LOCAL_STORAGE } from "../shared/const";
import { addBankCardToLocalStorage } from '../utilities/utilities'

export default class BankCardForm {
  constructor() {
    this.createBankCardForm();
    // this.domIsCardValidMessage = document.createElement('p');
  }

  createBankCardForm() {
    const bankCardForm = document.createElement("form");
    const bankCardFormCardNumberInput = document.createElement("input");
    const banCardFormButtonCardCommentInput = document.createElement("input");
    const banCardFormButton = document.createElement("button");

    const submitMessage = document.createElement('p');
    submitMessage.setAttribute('id', 'form-message');

    
    banCardFormButton.innerHTML= 'submit';

    bankCardFormCardNumberInput.addEventListener("change", (event) =>
      this.onCardNumberInputChange(event.target.value)
    );
    bankCardForm.addEventListener("submit", (event) =>
      this.handleBankCardFormSubmit(event)
    );

    bankCardForm.appendChild(bankCardFormCardNumberInput);
    bankCardForm.appendChild(banCardFormButtonCardCommentInput);
    bankCardForm.appendChild(banCardFormButton);
    bankCardForm.appendChild(submitMessage);
    // bankCardForm.appendChild(this.domIsCardValidMessage);

    return bankCardForm;
  }

  onCardNumberInputChange(value) {
    const isCardValid = this.checkCardValidation(value);

    const domSubmitMessage = document.getElementById('form-message');
    domSubmitMessage.innerHTML = isCardValid ? 'Valid number' : 'not valid number';
    console.log(isCardValid)
  }

  handleBankCardFormSubmit(event) {
    event.preventDefault();
    const domSubmitMessage = document.getElementById('form-message');

    if (event.target[0].value.length === 16) {
        const isCardValid = this.checkCardValidation(event.target[0].value);
        if (isCardValid) {
            const bankCardType = this.selectCardTypeFromCardNumber(event.target[0].value);
        
            const bankCard = new BankCard(event.target[0].value, event.target[1].value, bankCardType);
            addBankCardToLocalStorage(bankCard);
            // const bankCardsInLocalStorage = JSON.parse(
            //   localStorage.getItem(BANK_CARDS_IN_LOCAL_STORAGE)
            // );
            // bankCardsInLocalStorage.push(bankCard);
            // localStorage.setItem(
            //   BANK_CARDS_IN_LOCAL_STORAGE,
            //   JSON.stringify(bankCardsInLocalStorage)
            // );
            const bankCardContainer = document.querySelector(".bank-card-container");
            bankCardContainer.appendChild(bankCard.createDomBankCard());
        }
        
        // domSubmitMessage.innerHTML = event.target[0].value.length
    } else domSubmitMessage.innerHTML = `please enter 16 digits. You entered: ${event.target[0].value.length}` ;
    

   

  }
  //https://overcoder.net/q/359800/%D1%80%D0%B5%D0%B0%D0%BB%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D1%8F-%D0%B0%D0%BB%D0%B3%D0%BE%D1%80%D0%B8%D1%82%D0%BC%D0%B0-%D0%BB%D1%83%D0%BD%D0%B0
  checkCardValidation(cardNumber) {
    // cardNumber as a string w/ digits only
    let digit = 0,
      even = false; // even = n-th digit counted from the end
    return (
      cardNumber
        .split("")
        .reverse()
        .reduce(
          (string, digitInStr) => {
            digit = parseInt(digitInStr); // reduce arg-0 - callback fnc
            return (
              string +
              ((even = !even) ? digit : [0, 2, 4, 6, 8, 1, 3, 5, 7, 9][digit])
            );
          }, // /end of callback fnc
          0 // reduce arg-1 - prev value for first iteration (sum)
        ) %
        10 ===
      0
    );
  }

  selectCardTypeFromCardNumber(cardNumber) {
    switch (cardNumber[0]) {
      case "4":
        return "VISA";
      case "5":
        return "MasterCard";
      case "6":
        return "БЕЛКАРТ";
    default:
        return "unknown card";
    }
  }
}
