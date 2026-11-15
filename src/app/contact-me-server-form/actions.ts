"use server";

import {
  saveContactSubmission,
  validateContactInput,
} from "@/lib/contact";
import type { ContactFormState } from "./form-state";

export async function submitContact(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const errors = validateContactInput({ name, email, message });

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors };
  }

  await saveContactSubmission({ name, email, message });

  return { status: "success", errors: {} };
}
