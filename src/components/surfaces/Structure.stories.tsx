import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Modal } from "./Modal";
import { BottomNav } from "./BottomNav";
import { FlowHeader } from "./FlowHeader";
import { Button } from "@/components/primitives/Button";
import { SelectorInput } from "@/components/primitives/SelectorInput";

const meta: Meta = { title: "Surfaces/Structure", parameters: { layout: "fullscreen" } };
export default meta;
type S = StoryObj;

function ModalDemo({ size }: { size: "small" | "large" }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="p-6">
      <Button onClick={() => setOpen(true)}>Open {size} modal</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        size={size}
        title={size === "small" ? "You're about to exit this experience." : "We'll Guide You"}
        actions={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>{size === "small" ? "No, stay" : "Cancel"}</Button>
            <Button onClick={() => setOpen(false)}>{size === "small" ? "Yes, continue" : "Got it"}</Button>
          </>
        }
      >
        {size === "small" ? (
          <p>You&apos;re leaving this experience and moving to planning for leave. You can return to benefit enrollment anytime. Would you like to proceed?</p>
        ) : (
          <>
            <p>A few quick answers are all it takes for a recommendation. Tap &ldquo;Get My Advice&rdquo; in the top banner to get started.</p>
            <div className="h-52 w-full rounded-sm bg-surface-muted" aria-label="Image placeholder" role="img" />
          </>
        )}
      </Modal>
    </div>
  );
}

export const ModalSmall: S = { render: () => <ModalDemo size="small" /> };
export const ModalLarge: S = { render: () => <ModalDemo size="large" /> };

export const BottomNavs: S = {
  render: () => (
    <div className="flex flex-col gap-8 bg-surface-default py-6">
      <BottomNav backLabel="Back" nextLabel="Next" />
      <BottomNav backLabel="Back" nextLabel="Next" variant="secondary" />
      <BottomNav nextLabel="Proceed to Enrollment" />
      <BottomNav backLabel="Back" nextLabel="Next" nextDisabled />
    </div>
  ),
};

export const FlowHeaders: S = {
  render: () => (
    <div className="flex flex-col gap-4">
      <FlowHeader title="Open Enrollment Guide" shortlist={{ total: "$445.75" }} />
      <FlowHeader title="Open Enrollment Guide" />
    </div>
  ),
};

export const SelectorInputs: S = {
  render: () => (
    <div className="flex max-w-onboarding-form flex-col gap-8 p-6">
      <SelectorInput legend="Who will be covered?" options={["Just me", "Me and my spouse", "Me and my children", "My family"]} defaultValue={["Just me"]} />
      <SelectorInput legend="Are you expecting a child?" options={["Yes", "No", "Not sure"]} resizing="hug" />
      <SelectorInput legend="Which benefits matter most?" type="checkbox" options={["Medical", "Dental", "Vision", "Life"]} resizing="hug" defaultValue={["Medical"]} disabledOptions={["Life"]} />
    </div>
  ),
};
