"use client";

import type { ContactSubmission } from "@/lib/contact";
import { relativeTime } from "@/lib/relative-time";

export default function ContactCard({
  submission,
  onEdit,
  onDelete,
}: {
  submission: ContactSubmission;
  onEdit: (submission: ContactSubmission) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <li className="rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
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
          <span title={new Date(submission.submittedAt).toLocaleString()}>
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
          onClick={() => onEdit(submission)}
          className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(submission.id)}
          className="text-sm font-medium text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
