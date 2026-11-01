"use client";

import { useState } from "react";
import { AppShell } from "@/components/surfaces/AppShell";
import { ContentWizard } from "@/components/surfaces/ContentWizard";
import { Modal } from "@/components/surfaces/Modal";
import { Button } from "@/components/primitives/Button";
import { DateField } from "@/components/primitives/TextField";
import { SelectorInput } from "@/components/primitives/SelectorInput";
import { AiMessage } from "@/components/widgets/AiMessage";
import { InlineTable } from "@/components/widgets/ContentBlocks";
import { reminders } from "../chat/data";
import { birthTypes, leaveSummary } from "./data";

/** Checks an MM/DD/YYYY date is complete and in the future. Returns an error message or "". */
function checkDate(value: string) {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);
  if (!value) return "";
  if (!m) return "Enter the date as MM/DD/YYYY.";
  const d = new Date(Number(m[3]), Number(m[1]) - 1, Number(m[2]));
  if (Number.isNaN(d.getTime()) || d.getMonth() !== Number(m[1]) - 1) return "Enter a real date, like 03/15/2027.";
  if (d < new Date()) return "Enter a date after today.";
  return "";
}

/** Leave planning, step 1: when is the baby due, and how might they be born. */
export function LeaveDueDate() {
  const [date, setDate] = useState("");
  const [touched, setTouched] = useState(false);
  const [exiting, setExiting] = useState(false);
  const error = touched ? checkDate(date) : "";
  const ready = date !== "" && checkDate(date) === "";

  return (
    <AppShell reminders={reminders}>
      <ContentWizard
        flowTitle="Plan your parental leave"
        stepTitle="When is your baby due?"
        stepDescription="We'll use your due date to map out when your leave starts, when pay changes and when you're back."
        onExit={() => setExiting(true)}
        nav={{ nextLabel: "Continue", nextDisabled: !ready }}
        chat={
          <AiMessage>
            <p>Congratulations. Let&apos;s plan your leave together. Your due date doesn&apos;t need to be exact: you can change it anytime.</p>
            <p>Here&apos;s what your company offers, so you know what to expect:</p>
            <InlineTable caption="Paid leave by birth type" columns={leaveSummary.columns} rows={leaveSummary.rows} />
          </AiMessage>
        }
      >
        <DateField
          label="Due date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          onBlur={() => setTouched(true)}
          status={error ? "error" : "default"}
          helperText={error || "Use the date your doctor gave you."}
        />
        <SelectorInput legend="How do you expect to give birth?" options={birthTypes} resizing="hug" />
      </ContentWizard>
      <Modal
        open={exiting}
        onClose={() => setExiting(false)}
        title="Leave planning for now?"
        actions={
          <>
            <Button variant="secondary" onClick={() => setExiting(false)}>Keep planning</Button>
            <Button onClick={() => setExiting(false)}>Leave</Button>
          </>
        }
      >
        <p>We&apos;ll save what you&apos;ve entered so you can pick up where you left off.</p>
      </Modal>
    </AppShell>
  );
}
