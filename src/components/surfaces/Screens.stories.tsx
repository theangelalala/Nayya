import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { WizardDemo } from "@/app/wizard/WizardDemo";
import OnboardingPage from "@/app/onboarding/page";
import SettingsPage from "@/app/settings/page";
import { LeaveDueDate } from "@/app/leave/LeaveDueDate";
import { FamilyDetails } from "@/app/family/FamilyDetails";

/** The surfaces with sample content. Use the viewport (ruler) button to check mobile and tablet. */
const meta: Meta = { title: "Surfaces/Screens", parameters: { layout: "fullscreen" } };
export default meta;
type S = StoryObj;

export const ContentWizard: S = { render: () => <WizardDemo /> };
export const Onboarding: S = { render: () => <OnboardingPage /> };
export const SingleScreen: S = { render: () => <SettingsPage /> };
export const LeavePlanningDueDate: S = { render: () => <LeaveDueDate /> };
export const FamilyDetailsStep: S = { render: () => <FamilyDetails /> };
