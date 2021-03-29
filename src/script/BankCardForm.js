import BankCard from "./BankCard";
import '../styles/bank-card-form.scss';
import { DEFAULT_VALUES, CARD_TYPE_VALUES } from "../shared/const";
import {
  addBankCardToLocalStorage,
  checkIsBankCardExistInLocalStorage,
} from "../utilities/utilities";

export default class BankCardForm {
  constructor() {
    this.createBankCardForm();
    // this.domIsCardValidMessage = document.createElement('p');
  }

  createBankCardForm() {
    const bankCardForm = document.createElement("form");
    bankCardForm.classList.add('bank-card__form');
    const bankCardFormInputNumberContainer = document.createElement('div');
    bankCardFormInputNumberContainer.classList.add('input-number__contaimer')
    const bankCardFormButtonCardCommentInput = document.createElement("input");
    bankCardFormButtonCardCommentInput.classList.add('input__comment');
    bankCardFormButtonCardCommentInput.setAttribute('maxlength', 1024);
    bankCardFormButtonCardCommentInput.setAttribute('placeholder', 'Write your comment here...')
    const bankCardFormButton = document.createElement("button");
    bankCardFormButton.classList.add('bank-card__button')

    for (let i = 0; i < DEFAULT_VALUES.NUMBER_OF_INPUT_BLOCKS; i++) {
      const bankCardFormCardNumberInput = document.createElement("input");
      // bankCardFormCardNumberInput.setAttribute("type", "number");
      bankCardFormCardNumberInput.setAttribute(
        "maxlength",
        DEFAULT_VALUES.NUMBER_OF_DIGITS_IN_INPUT_BLOCK
      );
      bankCardFormCardNumberInput.setAttribute('placeholder', 'Card№')
      bankCardFormCardNumberInput.classList.add("input__number");
      bankCardFormInputNumberContainer.appendChild(bankCardFormCardNumberInput);
    }

    const submitMessage = document.createElement("p");
    submitMessage.setAttribute("id", "form-message");

    bankCardFormButton.innerHTML = "submit";

    // bankCardFormCardNumberInput.addEventListener("change", (event) =>
    //   this.onCardNumberInputChange(event.target.value)
    // );
    bankCardForm.addEventListener("submit", (event) =>
      this.handleBankCardFormSubmit(event)
    );

    bankCardForm.appendChild(bankCardFormInputNumberContainer);
    bankCardForm.appendChild(bankCardFormButtonCardCommentInput);
    bankCardForm.appendChild(bankCardFormButton);
    bankCardForm.appendChild(submitMessage);
    // bankCardForm.appendChild(this.domIsCardValidMessage);

    return bankCardForm;
  }

  onCardNumberInputChange(value) {
    const isCardValid = this.checkCardValidation(value);

    const domSubmitMessage = document.getElementById("form-message");
    domSubmitMessage.innerHTML = isCardValid
      ? "Valid number"
      : "not valid number";
    console.log(isCardValid);
  }

  handleBankCardFormSubmit(event) {
    event.preventDefault();
    const domSubmitMessage = document.getElementById("form-message");
    const cardNumberInInput = `${event.target[0].value}${event.target[1].value}${event.target[2].value}${event.target[3].value}`;

    if (
      cardNumberInInput.length ===
      DEFAULT_VALUES.NUMBER_OF_DIGITS_IN_CARD_NUMBER
    ) {
      const isCardValid = this.checkCardValidation(cardNumberInInput);
      const isCardExistInLocalStorage = checkIsBankCardExistInLocalStorage(
        cardNumberInInput
      );
      if (isCardValid && !isCardExistInLocalStorage) {
        const bankCardType = this.selectCardTypeFromCardNumber(
          cardNumberInInput
        );
        const bankCard = new BankCard(
          cardNumberInInput,
          event.target[4].value,
          bankCardType
        );
        addBankCardToLocalStorage(bankCard);
        const bankCardContainer = document.querySelector(
          ".bank-card-container"
        );
        bankCardContainer.appendChild(bankCard.createDomBankCard());
      } else
        domSubmitMessage.innerHTML = `Card with this number: ${cardNumberInInput} exist or not valid number`;
    } else
      domSubmitMessage.innerHTML = `please enter 16 digits. You entered: ${cardNumberInInput.length}`;
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
      case CARD_TYPE_VALUES.VISA.digit:
        return CARD_TYPE_VALUES.VISA.name;
      case CARD_TYPE_VALUES.MASTERCARD.digit:
        return CARD_TYPE_VALUES.MASTERCARD.name;
      case CARD_TYPE_VALUES.BELCART.digit:
        return CARD_TYPE_VALUES.BELCART.name;
      default:
        return CARD_TYPE_VALUES.DEFAULT.name;
    }
  }
}
