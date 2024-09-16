function verifyLastDigits(digitExpected: number, checkerDigit: string) {

  const expectedDigitFormatted = digitExpected >= 2 ? 11 - digitExpected : 0
  const checkerDigitFormatted = Number(checkerDigit)

  return expectedDigitFormatted === checkerDigitFormatted
}

function verifyCNPJ(cnpjNumber: string) {
  const [
    firstDigit,
    secondDigit,
    thirdDigit,
    fourthDigit,
    fifthDigit,
    sixthDigit,
    seventhDigit,
    eighthDigit,
    ninthDigit,
    tenthDigit,
    eleventhDigit,
    twelfthDigit,
    thirteenthDigit,
    fourteenthDigit,
  ] = cnpjNumber

  const firstDigitExpected = (
    Number(firstDigit) * 5 +
    Number(secondDigit) * 4 +
    Number(thirdDigit) * 3 +
    Number(fourthDigit) * 2 +
    Number(fifthDigit) * 9 +
    Number(sixthDigit) * 8 +
    Number(seventhDigit) * 7 +
    Number(eighthDigit) * 6 +
    Number(ninthDigit) * 5 +
    Number(tenthDigit) * 4 +
    Number(eleventhDigit) * 3 +
    Number(twelfthDigit) * 2
  ) % 11

  const secondDigitExpected = (
    Number(firstDigit) * 6 +
    Number(secondDigit) * 5 +
    Number(thirdDigit) * 4 +
    Number(fourthDigit) * 3 +
    Number(fifthDigit) * 2 +
    Number(sixthDigit) * 9 +
    Number(seventhDigit) * 8 +
    Number(eighthDigit) * 7 +
    Number(ninthDigit) * 6 +
    Number(tenthDigit) * 5 +
    Number(eleventhDigit) * 4 +
    Number(twelfthDigit) * 3 +
    Number(thirteenthDigit) * 2
  ) % 11

  const isFirstDigitValid = verifyLastDigits(firstDigitExpected, thirteenthDigit)
  const isSecondDigitValid = verifyLastDigits(secondDigitExpected, fourteenthDigit)

  if (isFirstDigitValid && isSecondDigitValid) {
    return true
  }

  throw new Error(`Invalid CNPJ: ${cnpjNumber}`);
}

export { verifyCNPJ }
