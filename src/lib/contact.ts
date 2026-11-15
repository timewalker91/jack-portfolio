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

export async function saveContactSubmission(input: ContactInput): Promise<void> {
  const submission = {
    name: input.name,
    email: input.email,
    message: input.message,
    submittedAt: new Date().toISOString(),
  };

  const dataDir = path.join(process.cwd(), "data");
  const dataFile = path.join(dataDir, "contact-submissions.json");

  await fs.mkdir(dataDir, { recursive: true });

  let submissions: unknown[] = [];
  try {
    const parsed: unknown = JSON.parse(await fs.readFile(dataFile, "utf8"));
    if (Array.isArray(parsed)) submissions = parsed;
  } catch {
    submissions = [];
  }

  submissions.push(submission);
  await fs.writeFile(
    dataFile,
    JSON.stringify(submissions, null, 2) + "\n",
    "utf8"
  );
}
