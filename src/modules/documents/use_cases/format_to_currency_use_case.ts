class FormatToCurrencyUseCase {

  async execute(value: number, locale = 'pt-BR', currency = 'BRL') {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
    // return value;
  }

}

export { FormatToCurrencyUseCase };
