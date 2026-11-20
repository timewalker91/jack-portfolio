import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";

export type EventErrors = {
  name?: string;
  date?: string;
  eventLink?: string;
  myLink?: string;
  takeaway?: string;
};

export type EventInput = {
  name: string;
  date: string;
  eventLink: string;
  myLink: string;
  takeaway: string;
};

export type EventItem = {
  id: string;
  name: string;
  date: string;
  eventLink: string;
  myLink: string;
  takeaway: string;
  createdAt: string;
};

function eventsDataFile(): string {
  return path.join(process.cwd(), "data", "events.json");
}

export async function readEvents(): Promise<EventItem[]> {
  try {
    const parsed: unknown = JSON.parse(
      await fs.readFile(eventsDataFile(), "utf8")
    );
    return Array.isArray(parsed) ? (parsed as EventItem[]) : [];
  } catch {
    return [];
  }
}

function isValidDateString(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(value + "T00:00:00Z");
  return (
    !Number.isNaN(parsed.getTime()) &&
    parsed.toISOString().slice(0, 10) === value
  );
}

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function validateEventInput(input: EventInput): EventErrors {
  const errors: EventErrors = {};
  if (!input.name) errors.name = "Name can't be empty.";
  if (!input.date) {
    errors.date = "Date can't be empty.";
  } else if (!isValidDateString(input.date)) {
    errors.date = "Date must be a valid date in YYYY-MM-DD format.";
  }
  if (input.eventLink && !isValidUrl(input.eventLink)) {
    errors.eventLink = "Event link must be a valid URL (http:// or https://).";
  }
  if (input.myLink && !isValidUrl(input.myLink)) {
    errors.myLink = "My link must be a valid URL (http:// or https://).";
  }
  if (!input.takeaway) errors.takeaway = "My takeaway can't be empty.";
  return errors;
}

export async function saveEvent(input: EventInput): Promise<EventItem> {
  const event: EventItem = {
    id: randomUUID(),
    ...input,
    createdAt: new Date().toISOString(),
  };

  const events = await readEvents();
  events.push(event);

  const dataDir = path.dirname(eventsDataFile());
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(
    eventsDataFile(),
    JSON.stringify(events, null, 2) + "\n",
    "utf8"
  );

  return event;
}

export async function updateEvent(
  id: string,
  input: EventInput
): Promise<EventItem | null> {
  const events = await readEvents();
  const index = events.findIndex((event) => event.id === id);
  if (index === -1) return null;

  const updated: EventItem = { ...events[index], ...input };
  events[index] = updated;

  await fs.writeFile(
    eventsDataFile(),
    JSON.stringify(events, null, 2) + "\n",
    "utf8"
  );

  return updated;
}
