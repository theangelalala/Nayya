/** Sample content for the "Tell us about your family" step. */
export type Member = { id: number; relationship: string; firstName: string; lastName: string; dob: string };

export const relationshipStatuses = ["Single", "Married", "Domestic partnership", "Divorced", "Widowed"];

export const relationships = ["Spouse", "Domestic partner", "Child", "Stepchild", "Other dependent"].map((r) => ({ value: r, label: r }));

/** The member themself, carried over from onboarding. */
export const you = { firstName: "Olivia", lastName: "Smith", dob: "01/10/1995" };

export const startingMembers: Member[] = [{ id: 1, relationship: "Spouse", firstName: "James", lastName: "Smith", dob: "06/22/1993" }];
