/** Sample plan choices for the Open Enrollment review step. Monthly costs add up to the shortlist total. */
export type PlanChoice = {
  /** Benefit type, used as the section heading ("Medical"). */
  benefit: string;
  /** Plan name as the carrier calls it. */
  plan: string;
  /** Label/value facts shown in the gray box. */
  details: { label: string; value: string }[];
};

export const coveredPeople = "You and Jordan (spouse)";

export const planChoices: PlanChoice[] = [
  {
    benefit: "Medical",
    plan: "Blue Shield PPO 1500",
    details: [
      { label: "Who's covered", value: coveredPeople },
      { label: "Deductible (what you pay before insurance starts sharing costs)", value: "$3,000 for your family" },
      { label: "Doctor visits", value: "$30 copay" },
      { label: "Your cost", value: "$352.40 a month" },
    ],
  },
  {
    benefit: "Dental",
    plan: "Delta Dental PPO",
    details: [
      { label: "Who's covered", value: coveredPeople },
      { label: "Cleanings and checkups", value: "Covered in full, twice a year" },
      { label: "Your cost", value: "$64.20 a month" },
    ],
  },
  {
    benefit: "Vision",
    plan: "VSP Choice",
    details: [
      { label: "Who's covered", value: coveredPeople },
      { label: "Glasses or contacts", value: "$150 allowance every year" },
      { label: "Your cost", value: "$18.15 a month" },
    ],
  },
  {
    benefit: "Life insurance",
    plan: "MetLife Supplemental Life",
    details: [
      { label: "Coverage amount", value: "$250,000" },
      { label: "Beneficiary (who receives the money)", value: "Jordan Kim" },
      { label: "Your cost", value: "$11.00 a month" },
    ],
  },
];

export const totals = {
  monthly: "$445.75",
  perPaycheck: "$222.88",
  starts: "January 1, 2027",
  deadline: "November 15, 2026",
};
