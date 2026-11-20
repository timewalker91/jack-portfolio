"use client";

import { useEffect, useState } from "react";
import type { EventItem } from "@/lib/events";

function formatDate(date: string): string {
  const [y, m, d] = date.split("-").map(Number);
  if (!y || !m || !d) return date;
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function EventsList() {
  const [events, setEvents] = useState<EventItem[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = () => {
      fetch("/api/events", { cache: "no-store" })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to load events");
          return res.json();
        })
        .then((data: { events: EventItem[] }) => {
          if (!cancelled) {
            setEvents(
              [...data.events].sort((a, b) => b.date.localeCompare(a.date))
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

  if (failed) {
    return (
      <p className="mt-10 text-sm text-red-600 dark:text-red-400">
        Couldn&apos;t load events. Please try again later.
      </p>
    );
  }

  if (events === null) {
    return <p className="mt-10 text-sm text-zinc-500">Loading events…</p>;
  }

  if (events.length === 0) {
    return (
      <p className="mt-10 text-zinc-600 dark:text-zinc-400">
        No events yet — check back soon.
      </p>
    );
  }

  return (
    <ul className="mt-10 grid gap-6">
      {events.map((event) => (
        <li
          key={event.id}
          className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900"
        >
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            {event.name}
          </h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            {formatDate(event.date)}
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
        </li>
      ))}
    </ul>
  );
}
