import type { Reminder } from "@/components/widgets/ReminderCard";

/** Sample content from the Figma Default Chat design. Replace with real data later. */
export const reminders: Reminder[] = [
  { title: "Open Enrollment", description: "Get personalized recommendations and enroll by 9/30.", icon: "alarm", due: "Due: 09/30/2025" },
  { title: "Maternity Checklist", description: "See your remaining tasks to complete.", icon: "list-checks", progress: { done: 2, total: 10 } },
];

export const suggestions = [
  "Get started with Open Enrollment",
  "Dive into our last conversation",
  "Tell me about my current benefits",
];
