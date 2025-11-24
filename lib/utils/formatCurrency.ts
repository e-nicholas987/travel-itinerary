export function formatCurrency({
  amount,
  currency,
  locale = "en-US",
  minimumFractionDigits = 2,
  maximumFractionDigits = 2,
}: {
  amount: number;
  currency: string;
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}) {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits,
      maximumFractionDigits,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(maximumFractionDigits)}`;
  }
}


