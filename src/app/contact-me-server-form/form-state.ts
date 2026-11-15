import type { ContactErrors } from "@/lib/contact";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  errors: ContactErrors;
};

export const initialContactFormState: ContactFormState = {
  status: "idle",
  errors: {},
};
