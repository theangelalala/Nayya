import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./Button";
import { TextField, DateField } from "./TextField";
import { SelectField } from "./SelectField";
import { Checkbox, Radio, Toggle } from "./Choice";

const meta: Meta = { title: "Primitives/Forms", parameters: { layout: "padded" } };
export default meta;

const Col = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="flex flex-col items-start gap-4">
    <p className="text-label-12-bold text-text-secondary">{title}</p>
    {children}
  </div>
);

/** Every Button variant and state. Hover and focus (Tab key) to see those states live. */
export const Buttons: StoryObj = {
  render: () => (
    <div className="flex flex-wrap gap-12">
      <Col title="Primary">
        <Button>Button</Button>
        <Button iconRight="caret-right-16">Continue</Button>
        <Button iconLeft="caret-left-16">Back</Button>
        <Button disabled>Disabled</Button>
      </Col>
      <Col title="Secondary">
        <Button variant="secondary">Button</Button>
        <Button variant="secondary" iconRight="caret-right-16">Continue</Button>
        <Button variant="secondary" destructive>Remove</Button>
        <Button variant="secondary" disabled>Disabled</Button>
      </Col>
      <Col title="Text">
        <Button variant="text">Button</Button>
        <Button variant="text" iconRight="caret-right-16">See all</Button>
        <Button variant="text" iconLeft="caret-left-16">Back</Button>
        <Button variant="text" destructive>Remove</Button>
        <Button variant="text" disabled>Disabled</Button>
      </Col>
    </div>
  ),
};

export const TextFields: StoryObj = {
  render: () => (
    <div className="grid max-w-4xl grid-cols-1 gap-6 tablet:grid-cols-2">
      <TextField label="Primary care visits" />
      <TextField label="Primary care visits" defaultValue="3" helperText="Visits per year" />
      <TextField label="Email" defaultValue="lucy@" status="error" helperText="Enter a full email address" />
      <TextField label="Annual income" defaultValue="$12,000" status="warning" helperText="This looks low. Please double-check." />
      <TextField label="Employee ID" defaultValue="A-1029" disabled helperText="Set by your employer" />
      <DateField label="Date of birth" helperText="MM/DD/YYYY" />
    </div>
  ),
};

const plans = [
  { value: "ppo", label: "PPO Gold" },
  { value: "hmo", label: "HMO Silver" },
  { value: "hdhp", label: "HDHP + HSA" },
];

export const SelectFields: StoryObj = {
  render: () => (
    <div className="grid max-w-4xl grid-cols-1 gap-6 tablet:grid-cols-2">
      <SelectField label="Plan" options={plans} />
      <SelectField label="Plan" options={plans} defaultValue="ppo" helperText="You can change this during Open Enrollment" />
      <SelectField label="Plan" options={plans} defaultValue="hmo" status="error" helperText="This plan isn't available in your state" />
      <SelectField label="Plan" options={plans} defaultValue="hdhp" status="warning" helperText="Higher deductible" />
      <SelectField label="Plan" options={plans} defaultValue="ppo" disabled helperText="Locked until next enrollment" />
    </div>
  ),
};

export const Checkboxes: StoryObj = {
  render: () => (
    <div className="flex max-w-md flex-col gap-3">
      <Checkbox label="Medical" />
      <Checkbox label="Dental" defaultChecked />
      <Checkbox label="Vision (not offered)" disabled />
      <Checkbox label="Life insurance" disabled defaultChecked />
      <div className="flex gap-6 pt-4">
        <Checkbox appearance="plain" label="Plain" />
        <Checkbox appearance="plain" label="Plain, checked" defaultChecked />
      </div>
    </div>
  ),
};

export const Radios: StoryObj = {
  render: () => (
    <div className="flex max-w-md flex-col gap-6">
      <fieldset className="flex flex-col gap-3">
        <legend className="pb-3 text-label-16-bold">Coverage level (plain)</legend>
        <Radio name="cov" label="Employee only" defaultChecked />
        <Radio name="cov" label="Employee + spouse" />
        <Radio name="cov" label="Family" />
        <Radio name="cov" label="Not available" disabled />
      </fieldset>
      <fieldset className="flex flex-col gap-3">
        <legend className="pb-3 text-label-16-bold">Coverage level (card)</legend>
        <Radio appearance="card" name="cov2" label="Employee only" />
        <Radio appearance="card" name="cov2" label="Family" defaultChecked />
      </fieldset>
    </div>
  ),
};

export const Toggles: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Toggle label="Email reminders" />
      <Toggle label="Text reminders" defaultChecked />
      <Toggle label="Disabled (off)" disabled />
      <Toggle label="Disabled (on)" disabled defaultChecked />
    </div>
  ),
};
