function verifyLastDigits(digitExpected: number, checkerDigit: string) {

  const expectedDigitFormatted = Math.floor((digitExpected / 1) % 10)
  const checkerDigitFormatted = Number(checkerDigit)

  return expectedDigitFormatted === checkerDigitFormatted
}

function verifyCPF(cpfNumber: string) {
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
    eleventhDigit
  ] = cpfNumber

  const firstDigitExpected = (
    Number(firstDigit) * 1 +
    Number(secondDigit) * 2 +
    Number(thirdDigit) * 3 +
    Number(fourthDigit) * 4 +
    Number(fifthDigit) * 5 +
    Number(sixthDigit) * 6 +
    Number(seventhDigit) * 7 +
    Number(eighthDigit) * 8 +
    Number(ninthDigit) * 9
  ) % 11

  const secondDigitExpected = (
    Number(firstDigit) * 0 +
    Number(secondDigit) * 1 +
    Number(thirdDigit) * 2 +
    Number(fourthDigit) * 3 +
    Number(fifthDigit) * 4 +
    Number(sixthDigit) * 5 +
    Number(seventhDigit) * 6 +
    Number(eighthDigit) * 7 +
    Number(ninthDigit) * 8 +
    Number(tenthDigit) * 9
  ) % 11

  const isFirstDigitValid = verifyLastDigits(firstDigitExpected, tenthDigit)
  const isSecondDigitValid = verifyLastDigits(secondDigitExpected, eleventhDigit)

  if (isFirstDigitValid && isSecondDigitValid) {
    return true
  }
  return false
}

export { verifyCPF }
