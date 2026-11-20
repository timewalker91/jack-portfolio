import { NextResponse } from "next/server";
import { readEvents, saveEvent, validateEventInput } from "@/lib/events";
import type { EventInput } from "@/lib/events";

export async function GET() {
  const events = await readEvents();
  return NextResponse.json({ events });
}

function parseInput(payload: Record<string, unknown>): EventInput {
  return {
    name: typeof payload.name === "string" ? payload.name.trim() : "",
    date: typeof payload.date === "string" ? payload.date.trim() : "",
    eventLink:
      typeof payload.eventLink === "string" ? payload.eventLink.trim() : "",
    myLink: typeof payload.myLink === "string" ? payload.myLink.trim() : "",
    takeaway:
      typeof payload.takeaway === "string" ? payload.takeaway.trim() : "",
  };
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { status: "error", error: "Request body must be valid JSON." },
      { status: 400 }
    );
  }

  const data = (
    typeof payload === "object" && payload !== null ? payload : {}
  ) as Record<string, unknown>;
  const input = parseInput(data);

  const errors = validateEventInput(input);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ status: "error", errors }, { status: 400 });
  }

  const event = await saveEvent(input);
  return NextResponse.json({ status: "success", event }, { status: 201 });
}
