"use server";

import { promises as fs } from "fs";
import path from "path";
import type { ContactErrors, ContactFormState } from "./form-state";

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

export async function submitContact(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const errors: ContactErrors = {};
  if (!name) errors.name = "Name can't be empty.";
  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;
  if (!message) errors.message = "Message can't be empty.";

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors };
  }

  const submission = {
    name,
    email,
    message,
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

  return { status: "success", errors: {} };
}
