import { NextResponse } from "next/server";
import {
  deleteContactSubmission,
  updateContactSubmission,
  validateContactInput,
} from "@/lib/contact";

function parseInput(payload: Record<string, unknown>) {
  return {
    name: typeof payload.name === "string" ? payload.name.trim() : "",
    email: typeof payload.email === "string" ? payload.email.trim() : "",
    message:
      typeof payload.message === "string" ? payload.message.trim() : "",
  };
}

export async function PUT(
  request: Request,
  { params }: RouteContext<"/api/contacts/[id]">
) {
  const { id } = await params;

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

  const errors = validateContactInput(input);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ status: "error", errors }, { status: 400 });
  }

  const submission = await updateContactSubmission(id, input);
  if (!submission) {
    return NextResponse.json(
      { status: "error", error: "Contact submission not found." },
      { status: 404 }
    );
  }

  return NextResponse.json({ status: "success", submission });
}

export async function DELETE(
  _request: Request,
  { params }: RouteContext<"/api/contacts/[id]">
) {
  const { id } = await params;

  const deleted = await deleteContactSubmission(id);
  if (!deleted) {
    return NextResponse.json(
      { status: "error", error: "Contact submission not found." },
      { status: 404 }
    );
  }

  return NextResponse.json({ status: "success" });
}
