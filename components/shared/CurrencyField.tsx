import { useCurrencies } from "@/queries";
import { SelectField } from "../ui";

type CurrencyFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function CurrencyField({ value, onChange }: CurrencyFieldProps) {
  const { data: currencies, isLoading: isLoadingCurrencies } = useCurrencies();
  return (
    <SelectField
      id="activities-currency"
      label="Currency"
      placeholder="Select currency"
      value={value}
      onChange={onChange}
      options={
        currencies?.data
          ? currencies.data.map((currency) => ({
              label: `${currency.name} (${currency.code})`,
              value: currency.code,
            }))
          : []
      }
      isLoading={isLoadingCurrencies}
    />
  );
}
