import { NextResponse } from "next/server";
import {
  readProjects,
  saveProject,
  slugTaken,
  validateProjectInput,
} from "@/lib/projects";
import type { ProjectInput } from "@/lib/projects";

function parseTech(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }
  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
}

function parseInput(payload: Record<string, unknown>): ProjectInput {
  return {
    slug: typeof payload.slug === "string" ? payload.slug.trim() : "",
    title: typeof payload.title === "string" ? payload.title.trim() : "",
    context:
      typeof payload.context === "string" ? payload.context.trim() : "",
    summary:
      typeof payload.summary === "string" ? payload.summary.trim() : "",
    overview:
      typeof payload.overview === "string" ? payload.overview.trim() : "",
    tech: parseTech(payload.tech),
  };
}

export async function GET() {
  const projects = await readProjects();
  return NextResponse.json({ projects });
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

  const errors = validateProjectInput(input);
  if (Object.keys(errors).length === 0 && (await slugTaken(input.slug))) {
    errors.slug = "Slug already in use.";
  }
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ status: "error", errors }, { status: 400 });
  }

  const project = await saveProject(input);

  return NextResponse.json({ status: "success", project }, { status: 201 });
}
