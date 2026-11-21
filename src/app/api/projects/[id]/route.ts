import { NextResponse } from "next/server";
import {
  deleteProject,
  readProjects,
  updateProject,
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
    slug: "",
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

export async function PUT(
  request: Request,
  { params }: RouteContext<"/api/projects/[id]">
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

  const existing = (await readProjects()).find((p) => p.id === id);
  if (!existing) {
    return NextResponse.json(
      { status: "error", error: "Project not found." },
      { status: 404 }
    );
  }
  input.slug = existing.slug;

  const errors = validateProjectInput(input);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ status: "error", errors }, { status: 400 });
  }

  const project = await updateProject(id, input);
  if (!project) {
    return NextResponse.json(
      { status: "error", error: "Project not found." },
      { status: 404 }
    );
  }

  return NextResponse.json({ status: "success", project });
}

export async function DELETE(
  _request: Request,
  { params }: RouteContext<"/api/projects/[id]">
) {
  const { id } = await params;

  const deleted = await deleteProject(id);
  if (!deleted) {
    return NextResponse.json(
      { status: "error", error: "Project not found." },
      { status: 404 }
    );
  }

  return NextResponse.json({ status: "success" });
}
