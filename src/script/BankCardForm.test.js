import BankCardForm from "./BankCardForm";

it("Checks, that new form creates: ", () => {
  const bankCardForm = new BankCardForm();
  expect(bankCardForm).toBeDefined();
});

it("Shows that form  has checkCardValidation: ", () => {
  const bankCardForm = new BankCardForm();
  expect(bankCardForm.checkCardValidation).toBeDefined();
});

it("Shows that form checkCardValidation working with VISA valid cards: ", () => {
  const bankCardForm = new BankCardForm();
  expect(bankCardForm.checkCardValidation).toBeDefined();
  expect(bankCardForm.checkCardValidation('4242424242424242')).toBeTruthy();
  expect(bankCardForm.checkCardValidation('4111111111111111')).toBeTruthy();
  expect(bankCardForm.checkCardValidation('4716059713971128')).toBeTruthy();
  expect(bankCardForm.checkCardValidation('4539469134658342')).toBeTruthy();
  expect(bankCardForm.checkCardValidation('4012888888881881')).toBeTruthy();
  expect(bankCardForm.checkCardValidation('4000000000000002')).toBeTruthy();
});

it("Shows that form checkCardValidation working with MasterCard valid cards: ", () => {
  const bankCardForm = new BankCardForm();
  expect(bankCardForm.checkCardValidation).toBeDefined();
  expect(bankCardForm.checkCardValidation('5554842174171979')).toBeTruthy();
  expect(bankCardForm.checkCardValidation('5500000000000004')).toBeTruthy();
  expect(bankCardForm.checkCardValidation('5238236929549825')).toBeTruthy();
  expect(bankCardForm.checkCardValidation('5339080833183281')).toBeTruthy();
  expect(bankCardForm.checkCardValidation('5555555555554444')).toBeTruthy();
  expect(bankCardForm.checkCardValidation('5105105105105100')).toBeTruthy();
});

it("Shows that form checkCardValidation not working with invalid cards: ", () => {
  const bankCardForm = new BankCardForm();
  expect(bankCardForm.checkCardValidation).toBeDefined();
  expect(bankCardForm.checkCardValidation('4242424242424243')).toBeFalsy();
  expect(bankCardForm.checkCardValidation('4222222222222222')).toBeFalsy();
  expect(bankCardForm.checkCardValidation('5100000000000512')).toBeFalsy();
  expect(bankCardForm.checkCardValidation('4111111111111112')).toBeFalsy();
  expect(bankCardForm.checkCardValidation('4716059713971126')).toBeFalsy();
  expect(bankCardForm.checkCardValidation('4539469134658343')).toBeFalsy();
  expect(bankCardForm.checkCardValidation('4012888888881885')).toBeFalsy();
  expect(bankCardForm.checkCardValidation('4000000000000000')).toBeFalsy();
  expect(bankCardForm.checkCardValidation('5554842174171982')).toBeFalsy();
  expect(bankCardForm.checkCardValidation('5500000000000000')).toBeFalsy();
  expect(bankCardForm.checkCardValidation('5238236929549828')).toBeFalsy();
  expect(bankCardForm.checkCardValidation('5339080833183289')).toBeFalsy();
  expect(bankCardForm.checkCardValidation('5555555555554442')).toBeFalsy();
  expect(bankCardForm.checkCardValidation('5105105105105103')).toBeFalsy();
});