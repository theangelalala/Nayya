import { Onboarding, FormRow } from "@/components/surfaces/Onboarding";
import { TextField, DateField } from "@/components/primitives/TextField";
import { SelectField } from "@/components/primitives/SelectField";

export const metadata = { title: "Welcome · Nayya" };

const states = ["MI", "NY", "CA", "TX"].map((s) => ({ value: s, label: s }));

/** Onboarding surface with the "Just a few more details" sample form. */
export default function OnboardingPage() {
  return (
    <Onboarding title="Just a few more details" description="A few details are still needed to complete your account setup.">
      <FormRow>
        <TextField label="First name" defaultValue="Olivia" autoComplete="given-name" />
        <TextField label="Last name" defaultValue="Smith" autoComplete="family-name" />
      </FormRow>
      <DateField label="Date of birth" defaultValue="01/10/1995" autoComplete="bday" />
      <TextField label="Home address" defaultValue="100 S Main St APT 2A" autoComplete="street-address" />
      <FormRow>
        <TextField label="City" defaultValue="Ann Arbor" autoComplete="address-level2" />
        <SelectField label="State" options={states} defaultValue="MI" />
      </FormRow>
      <TextField label="ZIP code" defaultValue="48104" inputMode="numeric" autoComplete="postal-code" />
    </Onboarding>
  );
}
