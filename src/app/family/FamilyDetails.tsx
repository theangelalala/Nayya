"use client";

import { createContext, useContext, useMemo, useState, useSyncExternalStore } from "react";
import { AppShell } from "@/components/surfaces/AppShell";
import { ContentWizard } from "@/components/surfaces/ContentWizard";
import { Button } from "@/components/primitives/Button";
import { TextField, DateField } from "@/components/primitives/TextField";
import { SelectField } from "@/components/primitives/SelectField";
import { SelectorInput } from "@/components/primitives/SelectorInput";
import { AiMessage } from "@/components/widgets/AiMessage";
import { BulletList } from "@/components/widgets/ContentBlocks";
import { reminders } from "../chat/data";
import {
  relationshipStatuses,
  relationships,
  startingMembers,
  you,
  type Member,
} from "./data";

/** Today's date, set in the browser after the page loads (the page is pre-built, so it can't know "today" in advance). */
const TodayContext = createContext<Date | null>(null);

/** Today's date in the browser; null while the page is being pre-built. */
function useToday(): Date | null {
  const key = useSyncExternalStore(
    () => () => {},
    () => new Date().toDateString(),
    () => null,
  );
  return useMemo(() => (key ? new Date(key) : null), [key]);
}

/** Reads an MM/DD/YYYY birth date. Returns the age in years, or an error message. Age needs `now`. */
function readBirthDate(
  value: string,
  now: Date | null,
): { age?: number; error?: string } {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);
  if (!m) return { error: "Enter the date as MM/DD/YYYY." };
  const [month, day, year] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const d = new Date(year, month - 1, day);
  if (d.getMonth() !== month - 1 || d.getDate() !== day)
    return { error: "Enter a real date, like 03/15/2015." };
  if (!now) return {};
  if (d > now) return { error: "Enter a date that isn't in the future." };
  let age = now.getFullYear() - year;
  if (
    now.getMonth() < month - 1 ||
    (now.getMonth() === month - 1 && now.getDate() < day)
  )
    age -= 1;
  return { age };
}

const ageLabel = (dob: string, now: Date | null) => {
  const { age } = readBirthDate(dob, now);
  return age === undefined
    ? ""
    : age === 0
      ? "Under 1 year old"
      : `${age} ${age === 1 ? "year" : "years"} old`;
};

/** One person's details in a bordered card. */
function MemberCard({
  member,
  onChange,
  onRemove,
}: {
  member: Member;
  onChange: (m: Member) => void;
  onRemove: () => void;
}) {
  const [touched, setTouched] = useState(false);
  const now = useContext(TodayContext);
  const { error } = readBirthDate(member.dob, now);
  const showError = touched && member.dob !== "" && error;
  const name = member.firstName.trim() ? `${member.firstName} ${member.lastName}`.trim() : "New family member";
  return (
    <fieldset className="flex flex-col gap-3 rounded-md border border-border-default bg-surface-default p-inset-card">
      <div className="flex items-center gap-3">
        <legend className="min-w-0 flex-1 truncate text-body-16-bold text-text-primary">
          {name}
        </legend>
        <Button
          variant="text"
          destructive
          onClick={onRemove}
          aria-label={`Remove ${name}`}
        >
          Remove
        </Button>
      </div>
      <SelectField
        label="Relationship to you"
        options={relationships}
        value={member.relationship}
        onChange={(e) => onChange({ ...member, relationship: e.target.value })}
      />
      <div className="flex flex-col gap-3 tablet:flex-row tablet:*:flex-1">
        <TextField
          label="First name"
          value={member.firstName}
          onChange={(e) => onChange({ ...member, firstName: e.target.value })}
        />
        <TextField
          label="Last name"
          value={member.lastName}
          onChange={(e) => onChange({ ...member, lastName: e.target.value })}
        />
      </div>
      <DateField
        label="Date of birth"
        value={member.dob}
        onChange={(e) => onChange({ ...member, dob: e.target.value })}
        onBlur={() => setTouched(true)}
        status={showError ? "error" : "default"}
        helperText={showError ? error : ageLabel(member.dob, now) || undefined}
      />
    </fieldset>
  );
}

/** Benefits setup step: who is in your family today. */
export function FamilyDetails() {
  const [status, setStatus] = useState<string[]>(["Married"]);
  const [members, setMembers] = useState<Member[]>(startingMembers);
  const now = useToday();
  const complete = (m: Member) =>
    m.relationship &&
    m.firstName.trim() &&
    m.lastName.trim() &&
    !readBirthDate(m.dob, now).error;
  const ready = status.length > 0 && members.every(complete);

  const update = (m: Member) =>
    setMembers((all) => all.map((x) => (x.id === m.id ? m : x)));
  const add = () =>
    setMembers((all) => [
      ...all,
      {
        id: Date.now(),
        relationship: "Child",
        firstName: "",
        lastName: you.lastName,
        dob: "",
      },
    ]);

  return (
    <TodayContext.Provider value={now}>
      <AppShell reminders={reminders}>
        <ContentWizard
          flowTitle="Set up your benefits"
          stepTitle="Tell us about your family"
          stepDescription="We'll use this to show coverage options that fit your household. You can update it anytime your family changes."
          nav={{
            backLabel: "Back",
            nextLabel: "Continue",
            nextDisabled: !ready,
          }}
          chat={
            <AiMessage>
              <p>
                Anyone you add here can be covered on your plans. I&apos;ll use
                ages to check who&apos;s eligible:
              </p>
              <BulletList
                items={[
                  <>
                    <strong>Children</strong> can stay on your health plan until
                    they turn 26.
                  </>,
                  <>
                    <strong>Spouses and domestic partners</strong> can be added
                    during enrollment or after a life event.
                  </>,
                  <>
                    <strong>Not sure about someone?</strong> Ask me here and
                    I&apos;ll explain.
                  </>,
                ]}
              />
            </AiMessage>
          }
        >
          <SelectorInput
            legend="What's your relationship status?"
            options={relationshipStatuses}
            resizing="hug"
            defaultValue={status}
            onChange={setStatus}
          />

          <section
            className="flex flex-col gap-4"
            aria-labelledby="you-heading"
          >
            <h3 id="you-heading" className="text-heading-21 text-text-primary">
              You
            </h3>
            <div className="flex flex-col gap-1 rounded-md border border-border-default bg-surface-default p-inset-card">
              <p className="text-body-16-bold text-text-primary">
                {you.firstName} {you.lastName}
              </p>
              <p className="text-label-14 text-text-secondary">
                Born January 10, 1995{now && ` · ${ageLabel(you.dob, now)}`}
              </p>
            </div>
          </section>

          <section
            className="flex flex-col gap-4"
            aria-labelledby="family-heading"
          >
            <div className="flex flex-col gap-1">
              <h3
                id="family-heading"
                className="text-heading-21 text-text-primary"
              >
                Your family
              </h3>
              <p className="text-body-14 text-text-secondary">
                Add your spouse or partner, children and anyone else who depends
                on you.
              </p>
            </div>
            {members.map((m) => (
              <MemberCard
                key={m.id}
                member={m}
                onChange={update}
                onRemove={() =>
                  setMembers((all) => all.filter((x) => x.id !== m.id))
                }
              />
            ))}
            <div>
              <Button variant="secondary" onClick={add}>
                Add a family member
              </Button>
            </div>
          </section>
        </ContentWizard>
      </AppShell>
    </TodayContext.Provider>
  );
}
