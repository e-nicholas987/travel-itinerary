import { InputField, SelectField } from "@/components/ui";

export default function ActivitiesPage() {
  return (
    <div className="flex-1 p-8 rounded-sm bg-white flex flex-col gap-2">
      <InputField id="search" label="Search" />

      <SelectField
        id="travellers"
        label="Travellers"
        options={[
          { label: "1 Traveller", value: 1 },
          { label: "2 Travellers", value: 2 },
        ]}
      />
    </div>
  );
}
