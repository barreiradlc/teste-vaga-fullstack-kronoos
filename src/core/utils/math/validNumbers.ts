function formatNumberTo2DecimalPlaces(num: string | number): number {
  const value = Number(num)

  const result = Number((Math.floor(value * 100) / 100).toFixed(2));

  return result
}

export { formatNumberTo2DecimalPlaces };
