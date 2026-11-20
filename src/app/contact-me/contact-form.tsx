"use client";

import { useEffect, useState } from "react";
import type { ContactErrors } from "@/lib/contact";

const DRAFT_KEY = "contact-me-draft";

type Draft = { name: string; email: string; message: string };

const emptyDraft: Draft = { name: "", email: "", message: "" };

const fieldClassName =
  "w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none transition-colors focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-zinc-100";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{message}</p>;
}

export default function ContactForm() {
  const [values, setValues] = useState<Draft>(emptyDraft);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [draftSaved, setDraftSaved] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const restore = () => {
      if (cancelled) return;
      try {
        const raw = window.localStorage.getItem(DRAFT_KEY);
        if (!raw) return;
        const draft = JSON.parse(raw) as Partial<Draft>;
        const restored: Draft = {
          name: typeof draft.name === "string" ? draft.name : "",
          email: typeof draft.email === "string" ? draft.email : "",
          message: typeof draft.message === "string" ? draft.message : "",
        };
        if (restored.name || restored.email || restored.message) {
          setValues(restored);
          setDraftSaved(true);
        }
      } catch {
        setDraftSaved(false);
      }
    };
    const timer = window.setTimeout(restore, 0);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  function update(field: keyof Draft, value: string) {
    const next = { ...values, [field]: value };
    setValues(next);
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify(next));
    setDraftSaved(true);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrors({});

    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        setStatus("success");
        setValues(emptyDraft);
        window.localStorage.removeItem(DRAFT_KEY);
        setDraftSaved(false);
        return;
      }

      const data = (await res.json().catch(() => ({}))) as {
        errors?: ContactErrors;
      };
      setErrors(data.errors ?? {});
      setStatus("error");
    } catch {
      setErrors({});
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 max-w-xl space-y-6" noValidate>
      {status === "success" ? (
        <p
          role="status"
          className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-300"
        >
          Thanks! Your message has been sent.
        </p>
      ) : null}

      {draftSaved && status !== "success" ? (
        <p className="text-xs text-zinc-500 dark:text-zinc-400" role="note">
          Draft saved
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
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
          className={fieldClassName}
        />
        <FieldError message={errors.name} />
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
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          className={fieldClassName}
        />
        <FieldError message={errors.email} />
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-sm font-medium text-zinc-900 dark:text-zinc-100"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          className={fieldClassName}
        />
        <FieldError message={errors.message} />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        {status === "sending" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
