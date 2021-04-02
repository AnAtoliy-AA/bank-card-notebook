export const BANK_CARDS_IN_LOCAL_STORAGE = 'bank_cards-notebook';

export const DEFAULT_VALUES = {
    NUMBER_OF_INPUT_BLOCKS: 4,
    NUMBER_OF_DIGITS_IN_INPUT_BLOCK: 4,
    NUMBER_OF_DIGITS_IN_CARD_NUMBER: 16,
}

export const CARD_TYPE_VALUES = {
    VISA: {
        name: 'visa',
        digit: '4',
    },
    MASTERCARD: {
        name: 'mastercard',
        digit: '5',
    },
    BELCART: {
        name: 'belcart',
        digit: '6',
    },
    DEFAULT: {
        name: 'unknown card type',
    }
}

export const INPUT_NUMBERS = {
    FIRST_CARD_NUMBER_INPUT: 0,
    SECOND_CARD_NUMBER_INPUT: 1,
    THIRD_CARD_NUMBER_INPUT: 2,
    FOURTH_CARD_NUMBER_INPUT: 3,
    COMMENT_INPUT: 4,
}