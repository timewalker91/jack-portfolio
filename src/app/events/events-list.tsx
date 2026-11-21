"use client";

import { useEffect, useState } from "react";
import EventCard from "@/components/event-card";
import type { EventItem } from "@/lib/events";

const inputClass =
  "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100";

type EditValues = {
  name: string;
  eventLink: string;
  myLink: string;
  takeaway: string;
};
type EditErrors = {
  name?: string;
  eventLink?: string;
  myLink?: string;
  takeaway?: string;
};

export default function EventsList() {
  const [events, setEvents] = useState<EventItem[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [values, setValues] = useState<EditValues>({
    name: "",
    eventLink: "",
    myLink: "",
    takeaway: "",
  });
  const [errors, setErrors] = useState<EditErrors>({});

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
              [...data.events].sort((a, b) =>
                b.createdAt.localeCompare(a.createdAt)
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
    fetch("/api/events", { cache: "no-store" })
      .then((res) => res.json())
      .then((data: { events: EventItem[] }) =>
        setEvents(
          [...data.events].sort((a, b) =>
            b.createdAt.localeCompare(a.createdAt)
          )
        )
      )
      .catch(() => setFailed(true));
  }

  function startEdit(event: EventItem) {
    setEditingId(event.id);
    setValues({
      name: event.name,
      eventLink: event.eventLink,
      myLink: event.myLink,
      takeaway: event.takeaway,
    });
    setErrors({});
  }

  async function saveEdit() {
    if (!editingId) return;
    const res = await fetch(`/api/events/${editingId}`, {
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
    if (!window.confirm("Delete this event?")) return;
    const res = await fetch(`/api/events/${id}`, { method: "DELETE" });
    if (res.ok) load();
  }

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
      {events.map((event) =>
        editingId === event.id ? (
          <li
            key={event.id}
            className="grid gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div>
              <label
                htmlFor="edit-event-name"
                className="mb-1.5 block text-sm font-medium text-zinc-900 dark:text-zinc-100"
              >
                Name
              </label>
              <input
                id="edit-event-name"
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
                htmlFor="edit-event-link"
                className="mb-1.5 block text-sm font-medium text-zinc-900 dark:text-zinc-100"
              >
                Event link (optional)
              </label>
              <input
                id="edit-event-link"
                value={values.eventLink}
                onChange={(e) =>
                  setValues({ ...values, eventLink: e.target.value })
                }
                className={inputClass}
              />
              {errors.eventLink ? (
                <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                  {errors.eventLink}
                </p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="edit-my-link"
                className="mb-1.5 block text-sm font-medium text-zinc-900 dark:text-zinc-100"
              >
                My link (optional)
              </label>
              <input
                id="edit-my-link"
                value={values.myLink}
                onChange={(e) =>
                  setValues({ ...values, myLink: e.target.value })
                }
                className={inputClass}
              />
              {errors.myLink ? (
                <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                  {errors.myLink}
                </p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="edit-takeaway"
                className="mb-1.5 block text-sm font-medium text-zinc-900 dark:text-zinc-100"
              >
                My takeaway
              </label>
              <textarea
                id="edit-takeaway"
                rows={3}
                value={values.takeaway}
                onChange={(e) =>
                  setValues({ ...values, takeaway: e.target.value })
                }
                className={inputClass}
              />
              {errors.takeaway ? (
                <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                  {errors.takeaway}
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
          <EventCard
            key={event.id}
            event={event}
            onEdit={startEdit}
            onDelete={remove}
          />
        )
      )}
    </ul>
  );
}
