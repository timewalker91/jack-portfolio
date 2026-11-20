import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";

export type ContactErrors = {
  name?: string;
  email?: string;
  message?: string;
};

export type ContactInput = {
  name: string;
  email: string;
  message: string;
};

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  message: string;
  submittedAt: string;
};

function validateEmail(email: string): string | undefined {
  if (!email) return "Email can't be empty.";
  if (email.split("@").length !== 2) {
    return "Email must contain exactly one @.";
  }
  if (/\s/.test(email)) return "Email can't contain spaces.";
  const [local, domain] = email.split("@");
  if (!local) return "Email must have text before the @.";
  if (!domain.includes(".")) return "Email domain must contain a dot.";
  if (domain.split(".").some((part) => part === "")) {
    return "Email domain can't have empty parts between dots.";
  }
  return undefined;
}

export function validateContactInput(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {};
  if (!input.name) errors.name = "Name can't be empty.";
  const emailError = validateEmail(input.email);
  if (emailError) errors.email = emailError;
  if (!input.message) errors.message = "Message can't be empty.";
  return errors;
}

function contactDataFile(): string {
  return path.join(process.cwd(), "data", "contact-submissions.json");
}

export async function readContactSubmissions(): Promise<ContactSubmission[]> {
  try {
    const parsed: unknown = JSON.parse(
      await fs.readFile(contactDataFile(), "utf8")
    );
    return Array.isArray(parsed) ? (parsed as ContactSubmission[]) : [];
  } catch {
    return [];
  }
}

async function writeContactSubmissions(
  submissions: ContactSubmission[]
): Promise<void> {
  const dataDir = path.dirname(contactDataFile());
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(
    contactDataFile(),
    JSON.stringify(submissions, null, 2) + "\n",
    "utf8"
  );
}

export async function saveContactSubmission(
  input: ContactInput
): Promise<ContactSubmission> {
  const submission: ContactSubmission = {
    id: randomUUID(),
    ...input,
    submittedAt: new Date().toISOString(),
  };

  const submissions = await readContactSubmissions();
  submissions.push(submission);
  await writeContactSubmissions(submissions);

  return submission;
}

export async function updateContactSubmission(
  id: string,
  input: ContactInput
): Promise<ContactSubmission | null> {
  const submissions = await readContactSubmissions();
  const index = submissions.findIndex((submission) => submission.id === id);
  if (index === -1) return null;

  const updated: ContactSubmission = { ...submissions[index], ...input };
  submissions[index] = updated;
  await writeContactSubmissions(submissions);

  return updated;
}

export async function deleteContactSubmission(id: string): Promise<boolean> {
  const submissions = await readContactSubmissions();
  const remaining = submissions.filter((submission) => submission.id !== id);
  if (remaining.length === submissions.length) return false;

  await writeContactSubmissions(remaining);
  return true;
}
