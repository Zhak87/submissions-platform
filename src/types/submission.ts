export type SubmissionCategory =
  | "business"
  | "medicine"
  | "education"
  | "government"
  | "other";

export type SubmissionStatus =
  | "new"
  | "reviewed"
  | "in_progress"
  | "resolved";

export interface SubmissionInput {
  name: string;
  company?: string;
  phone: string;
  email: string;
  category?: SubmissionCategory;
  problemDescription: string;
  proposedSolution?: string;
  language: "ru" | "kz";
  /** Honeypot field — must stay empty. Presence of a value marks the request as spam. */
  website?: string;
}

export interface SubmissionRow {
  id: string;
  created_at: string;
  name: string;
  company: string | null;
  phone: string;
  email: string;
  category: SubmissionCategory | null;
  problem_description: string;
  proposed_solution: string | null;
  language: "ru" | "kz";
  status: SubmissionStatus;
}
