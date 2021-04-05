import {
  CARD_TYPE_VALUES,
  DEFAULT_VALUES,
  FIRST_NUMBER,
} from "../shared/const";
import ModalWindow from "./ModalWindow";
import belcartImage from "../images/logo_belcart.png";
import masterCardImage from "../images/logo-mastercard.png";
import visaImage from "../images/logo-visa.png";
import "../styles/bank-card.scss";
export default class BankCard {
  constructor(cardNumber, cardComment) {
    this.cardNumber = cardNumber;
    this.cardComment = cardComment;
  }

  createDomBankCard() {
    const domBankCard = document.createElement("div");
    const domBankCardNumberContainer = document.createElement("div");
    const domBankCardComment = document.createElement("p");
    const domBankCardTypeImage = document.createElement("img");
    const deleteBankCardButton = document.createElement("button");
    const cardTypeImage = this.selectCardTypeFromCardNumber(this.cardNumber);

    domBankCard.classList.add("bank-card");
    domBankCardNumberContainer.classList.add("bank-card__number");

    for (let i = 0; i < DEFAULT_VALUES.NUMBER_OF_INPUT_BLOCKS; i++) {
      const domBankCardNumber = document.createElement("p");

      domBankCardNumber.innerText = this.cardNumber.substring(
        i * DEFAULT_VALUES.NUMBER_OF_DIGITS_IN_INPUT_BLOCK,
        i * DEFAULT_VALUES.NUMBER_OF_DIGITS_IN_INPUT_BLOCK +
          DEFAULT_VALUES.NUMBER_OF_DIGITS_IN_INPUT_BLOCK
      );
      domBankCardNumberContainer.appendChild(domBankCardNumber);
    }

    domBankCardComment.innerText = this.cardComment || "no comments";
    domBankCardComment.classList.add("bank-card__comment");
    domBankCardComment.setAttribute("title", this.cardComment);

    domBankCardTypeImage.setAttribute("src", cardTypeImage);
    domBankCardTypeImage.setAttribute("alt", cardTypeImage);
    domBankCardTypeImage.classList.add("bank-card__image");

    deleteBankCardButton.classList.add("button", "button_danger");
    deleteBankCardButton.innerText = "delete card";

    deleteBankCardButton.addEventListener("click", () => {
      this.createModalWindow(this.cardNumber, domBankCard);
    });

    domBankCard.appendChild(domBankCardNumberContainer);
    domBankCard.appendChild(domBankCardComment);
    domBankCard.appendChild(deleteBankCardButton);
    domBankCard.appendChild(domBankCardTypeImage);

    return domBankCard;
  }

  selectCardTypeFromCardNumber(cardNumber) {
    switch (cardNumber[FIRST_NUMBER]) {
      case CARD_TYPE_VALUES.VISA.digit:
        return visaImage;
      case CARD_TYPE_VALUES.MASTERCARD.digit:
        return masterCardImage;
      case CARD_TYPE_VALUES.BELCART.digit:
        return belcartImage;
      default:
        return CARD_TYPE_VALUES.DEFAULT.name;
    }
  }

  createModalWindow(cardNumber, domBankCard) {
    new ModalWindow(cardNumber, domBankCard);
  }
}
