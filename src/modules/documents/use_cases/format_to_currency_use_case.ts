class FormatToCurrencyUseCase {
  execute(value: number | string, locale = 'pt-BR', currency = 'BRL') {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number(value));
  }

}

export { FormatToCurrencyUseCase };
