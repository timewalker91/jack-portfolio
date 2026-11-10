"use client";

import { useActionState } from "react";
import { submitContact } from "./actions";
import { initialContactFormState } from "./form-state";

const fieldClassName =
  "w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none transition-colors focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-zinc-100";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{message}</p>;
}

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialContactFormState
  );

  return (
    <form
      key={state.status === "success" ? "sent" : "editing"}
      action={formAction}
      className="mt-10 max-w-xl space-y-6"
      noValidate
    >
      {state.status === "success" ? (
        <p
          role="status"
          className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-300"
        >
          Thanks! Your message has been sent.
        </p>
      ) : null}

      <div>
        <label
          htmlFor="name"
          className="mb-1.5 block text-sm font-medium text-zinc-900 dark:text-zinc-100"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          className={fieldClassName}
        />
        <FieldError message={state.errors.name} />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-sm font-medium text-zinc-900 dark:text-zinc-100"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          className={fieldClassName}
        />
        <FieldError message={state.errors.email} />
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-sm font-medium text-zinc-900 dark:text-zinc-100"
        >
          Message
        </label>
        <textarea id="message" name="message" rows={5} className={fieldClassName} />
        <FieldError message={state.errors.message} />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        {pending ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
