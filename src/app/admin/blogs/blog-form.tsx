"use client";

import { useEffect, useState } from "react";
import type { BlogErrors } from "@/lib/blogs";

const DRAFT_KEY = "blog-post-draft";

type Draft = { title: string; content: string };

const emptyDraft: Draft = { title: "", content: "" };

const fieldClassName =
  "w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none transition-colors focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-zinc-100";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{message}</p>;
}

export default function BlogForm() {
  const [values, setValues] = useState<Draft>(emptyDraft);
  const [errors, setErrors] = useState<BlogErrors>({});
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
          title: typeof draft.title === "string" ? draft.title : "",
          content: typeof draft.content === "string" ? draft.content : "",
        };
        if (restored.title || restored.content) {
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
      const res = await fetch("/api/blogs", {
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
        errors?: BlogErrors;
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
          Blog post published.
        </p>
      ) : null}

      {draftSaved && status !== "success" ? (
        <p className="text-xs text-zinc-500 dark:text-zinc-400" role="note">
          Draft saved
        </p>
      ) : null}

      <div>
        <label
          htmlFor="title"
          className="mb-1.5 block text-sm font-medium text-zinc-900 dark:text-zinc-100"
        >
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={values.title}
          onChange={(e) => update("title", e.target.value)}
          className={fieldClassName}
        />
        <FieldError message={errors.title} />
      </div>

      <div>
        <label
          htmlFor="content"
          className="mb-1.5 block text-sm font-medium text-zinc-900 dark:text-zinc-100"
        >
          Content
        </label>
        <textarea
          id="content"
          name="content"
          rows={12}
          value={values.content}
          onChange={(e) => update("content", e.target.value)}
          className={fieldClassName}
        />
        <FieldError message={errors.content} />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        {status === "sending" ? "Publishing..." : "Publish post"}
      </button>
    </form>
  );
}
