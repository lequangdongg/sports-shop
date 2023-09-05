export const formatCurrency = (currency: number): string =>
  `${new Intl.NumberFormat('vi').format(currency)} ₫`;
