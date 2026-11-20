"use client";

import { useEffect, useState } from "react";
import type { EventErrors, EventInput, EventItem } from "@/lib/events";

const emptyForm: EventInput = {
  name: "",
  date: "",
  eventLink: "",
  myLink: "",
  takeaway: "",
};

const fieldClassName =
  "w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none transition-colors focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-zinc-100";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{message}</p>
  );
}

export default function EventsAdmin() {
  const [values, setValues] = useState<EventInput>(emptyForm);
  const [errors, setErrors] = useState<EventErrors>({});
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [events, setEvents] = useState<EventItem[]>([]);

  async function loadEvents() {
    try {
      const res = await fetch("/api/events", { cache: "no-store" });
      if (!res.ok) return;
      const data = (await res.json()) as { events: EventItem[] };
      setEvents([...data.events].sort((a, b) => b.date.localeCompare(a.date)));
    } catch {
      return;
    }
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadEvents();
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  function update(field: keyof EventInput, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function startEdit(event: EventItem) {
    setEditingId(event.id);
    setValues({
      name: event.name,
      date: event.date,
      eventLink: event.eventLink,
      myLink: event.myLink,
      takeaway: event.takeaway,
    });
    setErrors({});
    setStatus("idle");
    setMessage("");
  }

  function cancelEdit() {
    setEditingId(null);
    setValues(emptyForm);
    setErrors({});
    setStatus("idle");
    setMessage("");
  }

  async function handleSubmit(formEvent: React.FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    const wasEditing = editingId !== null;
    setStatus("sending");
    setErrors({});

    try {
      const res = await fetch(
        editingId ? `/api/events/${editingId}` : "/api/events",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );

      if (res.ok) {
        setStatus("success");
        setMessage(wasEditing ? "Event updated." : "Event added.");
        setValues(emptyForm);
        setEditingId(null);
        await loadEvents();
        return;
      }

      const data = (await res.json().catch(() => ({}))) as {
        errors?: EventErrors;
      };
      setErrors(data.errors ?? {});
      setStatus("error");
    } catch {
      setErrors({});
      setStatus("error");
    }
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16">
      <div>
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          noValidate
        >
          {status === "success" && message ? (
            <p
              role="status"
              className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-300"
            >
              {message}
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
              value={values.name}
              onChange={(e) => update("name", e.target.value)}
              className={fieldClassName}
            />
            <FieldError message={errors.name} />
          </div>

          <div>
            <label
              htmlFor="date"
              className="mb-1.5 block text-sm font-medium text-zinc-900 dark:text-zinc-100"
            >
              Date
            </label>
            <input
              id="date"
              name="date"
              type="date"
              value={values.date}
              onChange={(e) => update("date", e.target.value)}
              className={fieldClassName}
            />
            <FieldError message={errors.date} />
          </div>

          <div>
            <label
              htmlFor="eventLink"
              className="mb-1.5 block text-sm font-medium text-zinc-900 dark:text-zinc-100"
            >
              Event link{" "}
              <span className="font-normal text-zinc-500 dark:text-zinc-400">
                (optional)
              </span>
            </label>
            <input
              id="eventLink"
              name="eventLink"
              type="url"
              placeholder="https://"
              value={values.eventLink}
              onChange={(e) => update("eventLink", e.target.value)}
              className={fieldClassName}
            />
            <FieldError message={errors.eventLink} />
          </div>

          <div>
            <label
              htmlFor="myLink"
              className="mb-1.5 block text-sm font-medium text-zinc-900 dark:text-zinc-100"
            >
              My link{" "}
              <span className="font-normal text-zinc-500 dark:text-zinc-400">
                (optional)
              </span>
            </label>
            <input
              id="myLink"
              name="myLink"
              type="url"
              placeholder="https://"
              value={values.myLink}
              onChange={(e) => update("myLink", e.target.value)}
              className={fieldClassName}
            />
            <FieldError message={errors.myLink} />
          </div>

          <div>
            <label
              htmlFor="takeaway"
              className="mb-1.5 block text-sm font-medium text-zinc-900 dark:text-zinc-100"
            >
              My takeaway
            </label>
            <textarea
              id="takeaway"
              name="takeaway"
              rows={4}
              value={values.takeaway}
              onChange={(e) => update("takeaway", e.target.value)}
              className={fieldClassName}
            />
            <FieldError message={errors.takeaway} />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={status === "sending"}
              className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
            >
              {status === "sending"
                ? "Saving..."
                : editingId
                  ? "Save changes"
                  : "Add event"}
            </button>
            {editingId ? (
              <button
                type="button"
                onClick={cancelEdit}
                className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
              >
                Cancel
              </button>
            ) : null}
          </div>
        </form>
      </div>

      <aside>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          Saved events
        </h2>
        {events.length === 0 ? (
          <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
            Nothing yet — add your first event.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {events.map((event) => (
              <li key={event.id} className="text-sm">
                <p className="font-medium text-zinc-900 dark:text-zinc-100">
                  {event.name}
                </p>
                <p className="text-zinc-500 dark:text-zinc-400">{event.date}</p>
                <button
                  type="button"
                  onClick={() => startEdit(event)}
                  className="mt-1 text-zinc-900 underline underline-offset-2 hover:text-zinc-600 dark:text-zinc-100 dark:hover:text-zinc-400"
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </div>
  );
}
