"use client";

import { useEffect, useState } from "react";
import type { ProjectErrors } from "@/lib/projects";

const DRAFT_KEY = "project-draft";

type Draft = {
  slug: string;
  title: string;
  context: string;
  summary: string;
  overview: string;
  tech: string;
};

const emptyDraft: Draft = {
  slug: "",
  title: "",
  context: "",
  summary: "",
  overview: "",
  tech: "",
};

const fieldClassName =
  "w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none transition-colors focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-zinc-100";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{message}</p>;
}

export default function ProjectForm() {
  const [values, setValues] = useState<Draft>(emptyDraft);
  const [errors, setErrors] = useState<ProjectErrors>({});
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
          slug: typeof draft.slug === "string" ? draft.slug : "",
          title: typeof draft.title === "string" ? draft.title : "",
          context: typeof draft.context === "string" ? draft.context : "",
          summary: typeof draft.summary === "string" ? draft.summary : "",
          overview: typeof draft.overview === "string" ? draft.overview : "",
          tech: typeof draft.tech === "string" ? draft.tech : "",
        };
        if (Object.values(restored).some(Boolean)) {
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
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: values.slug,
          title: values.title,
          context: values.context,
          summary: values.summary,
          overview: values.overview,
          tech: values.tech
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
        }),
      });

      if (res.ok) {
        setStatus("success");
        setValues(emptyDraft);
        window.localStorage.removeItem(DRAFT_KEY);
        setDraftSaved(false);
        return;
      }

      const data = (await res.json().catch(() => ({}))) as {
        errors?: ProjectErrors;
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
          Project published.
        </p>
      ) : null}

      {draftSaved && status !== "success" ? (
        <p className="text-xs text-zinc-500 dark:text-zinc-400" role="note">
          Draft saved
        </p>
      ) : null}

      <div>
        <label
          htmlFor="slug"
          className="mb-1.5 block text-sm font-medium text-zinc-900 dark:text-zinc-100"
        >
          Slug
        </label>
        <input
          id="slug"
          name="slug"
          type="text"
          value={values.slug}
          onChange={(e) => update("slug", e.target.value)}
          className={fieldClassName}
        />
        <FieldError message={errors.slug} />
      </div>

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
          htmlFor="context"
          className="mb-1.5 block text-sm font-medium text-zinc-900 dark:text-zinc-100"
        >
          Context (optional)
        </label>
        <input
          id="context"
          name="context"
          type="text"
          value={values.context}
          onChange={(e) => update("context", e.target.value)}
          className={fieldClassName}
        />
      </div>

      <div>
        <label
          htmlFor="summary"
          className="mb-1.5 block text-sm font-medium text-zinc-900 dark:text-zinc-100"
        >
          Summary
        </label>
        <textarea
          id="summary"
          name="summary"
          rows={3}
          value={values.summary}
          onChange={(e) => update("summary", e.target.value)}
          className={fieldClassName}
        />
        <FieldError message={errors.summary} />
      </div>

      <div>
        <label
          htmlFor="overview"
          className="mb-1.5 block text-sm font-medium text-zinc-900 dark:text-zinc-100"
        >
          Overview
        </label>
        <textarea
          id="overview"
          name="overview"
          rows={5}
          value={values.overview}
          onChange={(e) => update("overview", e.target.value)}
          className={fieldClassName}
        />
        <FieldError message={errors.overview} />
      </div>

      <div>
        <label
          htmlFor="tech"
          className="mb-1.5 block text-sm font-medium text-zinc-900 dark:text-zinc-100"
        >
          Tech (comma-separated)
        </label>
        <input
          id="tech"
          name="tech"
          type="text"
          value={values.tech}
          onChange={(e) => update("tech", e.target.value)}
          className={fieldClassName}
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        {status === "sending" ? "Publishing..." : "Publish project"}
      </button>
    </form>
  );
}
