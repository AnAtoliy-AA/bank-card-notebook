export default class BankCard {
    constructor(cardNumber) {
        this.cardNumber= cardNumber;
    }

    createBankCard() {
        const bankCard = document.createElement('div');
        bankCard.innerHTML=this.cardNumber;

        return bankCard;
    }
}