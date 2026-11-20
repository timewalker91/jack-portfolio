"use client";

import { useEffect, useState } from "react";
import type { ContactSubmission } from "@/lib/contact";
import { relativeTime } from "@/lib/relative-time";

const inputClass =
  "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100";

type EditValues = { name: string; email: string; message: string };
type EditErrors = { name?: string; email?: string; message?: string };

export default function ContactsAdmin() {
  const [submissions, setSubmissions] = useState<
    ContactSubmission[] | null
  >(null);
  const [failed, setFailed] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [values, setValues] = useState<EditValues>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<EditErrors>({});

  useEffect(() => {
    let cancelled = false;
    const load = () => {
      fetch("/api/contacts", { cache: "no-store" })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to load submissions");
          return res.json();
        })
        .then((data: { submissions: ContactSubmission[] }) => {
          if (!cancelled) {
            setSubmissions(
              [...data.submissions].sort((a, b) =>
                b.submittedAt.localeCompare(a.submittedAt)
              )
            );
          }
        })
        .catch(() => {
          if (!cancelled) setFailed(true);
        });
    };
    const timer = window.setTimeout(load, 0);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  function load() {
    fetch("/api/contacts", { cache: "no-store" })
      .then((res) => res.json())
      .then((data: { submissions: ContactSubmission[] }) =>
        setSubmissions(
          [...data.submissions].sort((a, b) =>
            b.submittedAt.localeCompare(a.submittedAt)
          )
        )
      )
      .catch(() => setFailed(true));
  }

  function startEdit(submission: ContactSubmission) {
    setEditingId(submission.id);
    setValues({
      name: submission.name,
      email: submission.email,
      message: submission.message,
    });
    setErrors({});
  }

  async function saveEdit() {
    if (!editingId) return;
    const res = await fetch(`/api/contacts/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    if (res.ok) {
      setEditingId(null);
      load();
    } else {
      setErrors(data.errors ?? {});
    }
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this submission?")) return;
    const res = await fetch(`/api/contacts/${id}`, { method: "DELETE" });
    if (res.ok) load();
  }

  if (failed) {
    return (
      <p className="mt-10 text-sm text-red-600 dark:text-red-400">
        Couldn&apos;t load submissions. Please try again later.
      </p>
    );
  }

  if (submissions === null) {
    return (
      <p className="mt-10 text-sm text-zinc-500">Loading submissions…</p>
    );
  }

  if (submissions.length === 0) {
    return (
      <p className="mt-10 text-zinc-600 dark:text-zinc-400">
        No submissions yet.
      </p>
    );
  }

  return (
    <ul className="mt-10 grid gap-6">
      {submissions.map((submission) =>
        editingId === submission.id ? (
          <li
            key={submission.id}
            className="grid gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div>
              <label
                htmlFor="edit-sub-name"
                className="mb-1.5 block text-sm font-medium text-zinc-900 dark:text-zinc-100"
              >
                Name
              </label>
              <input
                id="edit-sub-name"
                value={values.name}
                onChange={(e) =>
                  setValues({ ...values, name: e.target.value })
                }
                className={inputClass}
              />
              {errors.name ? (
                <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                  {errors.name}
                </p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="edit-sub-email"
                className="mb-1.5 block text-sm font-medium text-zinc-900 dark:text-zinc-100"
              >
                Email
              </label>
              <input
                id="edit-sub-email"
                value={values.email}
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
                className={inputClass}
              />
              {errors.email ? (
                <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                  {errors.email}
                </p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="edit-sub-message"
                className="mb-1.5 block text-sm font-medium text-zinc-900 dark:text-zinc-100"
              >
                Message
              </label>
              <textarea
                id="edit-sub-message"
                rows={4}
                value={values.message}
                onChange={(e) =>
                  setValues({ ...values, message: e.target.value })
                }
                className={inputClass}
              />
              {errors.message ? (
                <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                  {errors.message}
                </p>
              ) : null}
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={saveEdit}
                className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
              >
                Save changes
              </button>
              <button
                type="button"
                onClick={() => setEditingId(null)}
                className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                Cancel
              </button>
            </div>
          </li>
        ) : (
          <li
            key={submission.id}
            className="rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                {submission.name}
              </h2>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                <a
                  href={`mailto:${submission.email}`}
                  className="underline underline-offset-2"
                >
                  {submission.email}
                </a>{" "}
                ·{" "}
                <span
                  title={new Date(submission.submittedAt).toLocaleString()}
                >
                  {relativeTime(submission.submittedAt)}
                </span>
              </p>
              <p className="mt-3 leading-7 text-zinc-600 dark:text-zinc-400">
                {submission.message}
              </p>
            </div>
            <div className="flex gap-2 border-t border-zinc-200 px-6 py-3 dark:border-zinc-800">
              <button
                type="button"
                onClick={() => startEdit(submission)}
                className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => remove(submission.id)}
                className="text-sm font-medium text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
              >
                Delete
              </button>
            </div>
          </li>
        )
      )}
    </ul>
  );
}
