export type ContactErrors = {
  name?: string;
  email?: string;
  message?: string;
};

export type ContactFormState = {
  status: "idle" | "success" | "error";
  errors: ContactErrors;
};

export const initialContactFormState: ContactFormState = {
  status: "idle",
  errors: {},
};
