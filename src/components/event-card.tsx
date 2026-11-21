"use client";

import type { EventItem } from "@/lib/events";
import { relativeTime } from "@/lib/relative-time";

export default function EventCard({
  event,
  onEdit,
  onDelete,
}: {
  event: EventItem;
  onEdit: (event: EventItem) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <li className="rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          {event.name}
        </h2>
        <p
          className="mt-1 text-sm text-zinc-500 dark:text-zinc-400"
          title={new Date(event.createdAt).toLocaleString()}
        >
          {relativeTime(event.createdAt)}
        </p>
        <p className="mt-3 leading-7 text-zinc-600 dark:text-zinc-400">
          <span className="font-medium text-zinc-900 dark:text-zinc-100">
            My takeaway:{" "}
          </span>
          {event.takeaway}
        </p>
        {event.eventLink || event.myLink ? (
          <div className="mt-4 flex flex-wrap gap-4 text-sm font-medium">
            {event.eventLink ? (
              <a
                href={event.eventLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-900 underline underline-offset-2 hover:text-zinc-600 dark:text-zinc-100 dark:hover:text-zinc-400"
              >
                Event link ↗
              </a>
            ) : null}
            {event.myLink ? (
              <a
                href={event.myLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-900 underline underline-offset-2 hover:text-zinc-600 dark:text-zinc-100 dark:hover:text-zinc-400"
              >
                My link ↗
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
      <div className="flex gap-2 border-t border-zinc-200 px-6 py-3 dark:border-zinc-800">
        <button
          type="button"
          onClick={() => onEdit(event)}
          className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(event.id)}
          className="text-sm font-medium text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
