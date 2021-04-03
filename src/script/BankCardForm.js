import "../styles/bank-card-form.scss";
import { DEFAULT_VALUES, INPUT_NUMBERS } from "../shared/const";
import { addBankCardToLocalStorage } from "../utilities/utilities";

export default class BankCardForm {
  constructor(createDomBankCardsFromLocalStorage) {
    this.createBankCardForm();
    this.domBankCardForm = this.createBankCardForm();
    this.createDomBankCardsFromLocalStorage = createDomBankCardsFromLocalStorage;
  }

  createBankCardForm() {
    const bankCardForm = document.createElement("form");
    const bankCardFormInputNumberContainer = document.createElement("div");
    const bankCardFormButtonCardCommentInput = document.createElement("input");
    const bankCardFormButton = document.createElement("button");

    bankCardForm.classList.add("bank-card__form");
    bankCardFormInputNumberContainer.classList.add("input-number__container");
    bankCardFormButtonCardCommentInput.classList.add("input__comment");

    bankCardFormButtonCardCommentInput.setAttribute("maxlength", 1024);
    bankCardFormButtonCardCommentInput.setAttribute(
      "placeholder",
      DEFAULT_VALUES.FORM_COMMENTS_PLACEHOLDER
    );
    bankCardFormButton.classList.add("button", "button_save");

    for (let i = 0; i < DEFAULT_VALUES.NUMBER_OF_INPUT_BLOCKS; i++) {
      const bankCardFormCardNumberInput = document.createElement("input");
      bankCardFormCardNumberInput.setAttribute(
        "maxlength",
        DEFAULT_VALUES.NUMBER_OF_DIGITS_IN_INPUT_BLOCK
      );
      bankCardFormCardNumberInput.setAttribute(
        "placeholder",
        DEFAULT_VALUES.FORM_CARD_NUMBER_PLACEHOLDER
      );
      bankCardFormCardNumberInput.classList.add("input__number");
      bankCardFormInputNumberContainer.appendChild(bankCardFormCardNumberInput);
    }

    const submitMessage = document.createElement("p");
    submitMessage.setAttribute("id", "form-message");

    bankCardFormButton.innerHTML = "submit";

    bankCardForm.addEventListener("submit", (event) =>
      this.handleBankCardFormSubmit(event)
    );

    bankCardForm.appendChild(bankCardFormInputNumberContainer);
    bankCardForm.appendChild(bankCardFormButtonCardCommentInput);
    bankCardForm.appendChild(bankCardFormButton);
    bankCardForm.appendChild(submitMessage);

    return bankCardForm;
  }

  handleBankCardFormSubmit(event) {
    event.preventDefault();
    const domSubmitMessage = document.getElementById("form-message");
    const cardNumberInInput = `${
      event.target[INPUT_NUMBERS.FIRST_CARD_NUMBER_INPUT].value
    }${event.target[INPUT_NUMBERS.SECOND_CARD_NUMBER_INPUT].value}${
      event.target[INPUT_NUMBERS.THIRD_CARD_NUMBER_INPUT].value
    }${event.target[INPUT_NUMBERS.FOURTH_CARD_NUMBER_INPUT].value}`;

    if (
      cardNumberInInput.length ===
      DEFAULT_VALUES.NUMBER_OF_DIGITS_IN_CARD_NUMBER
    ) {
      const isCardValid = this.checkCardValidation(cardNumberInInput);

      if (isCardValid) {
        addBankCardToLocalStorage(
          cardNumberInInput,
          event.target[INPUT_NUMBERS.COMMENT_INPUT].value
        );
        this.createDomBankCardsFromLocalStorage();
        domSubmitMessage.innerHTML = DEFAULT_VALUES.EMPTY;
        this.domBankCardForm.reset();
      } else
        domSubmitMessage.innerHTML = `${DEFAULT_VALUES.FORM_MESSAGE_INVALID_CARD_BEFORE}${cardNumberInInput}${DEFAULT_VALUES.FORM_MESSAGE_INVALID_CARD_AFTER}`;
    } else
      domSubmitMessage.innerHTML = `${DEFAULT_VALUES.FORM_MESSAGE_NUMBERS_COUNT}${cardNumberInInput.length}`;
  }

  checkCardValidation(cardNumber) {
    let digit = 0,
      even = false;
    return (
      cardNumber
        .split("")
        .reverse()
        .reduce((string, digitInStr) => {
          digit = parseInt(digitInStr);
          return (
            string +
            ((even = !even) ? digit : [0, 2, 4, 6, 8, 1, 3, 5, 7, 9][digit])
          );
        }, 0) %
        10 ===
      0
    );
  }
}
