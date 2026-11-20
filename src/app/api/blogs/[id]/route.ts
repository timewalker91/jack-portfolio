import { NextResponse } from "next/server";
import {
  deleteBlogPost,
  updateBlogPost,
  validateBlogInput,
} from "@/lib/blogs";

function parseInput(payload: Record<string, unknown>) {
  return {
    title: typeof payload.title === "string" ? payload.title.trim() : "",
    content:
      typeof payload.content === "string" ? payload.content.trim() : "",
  };
}

export async function PUT(
  request: Request,
  { params }: RouteContext<"/api/blogs/[id]">
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

  const errors = validateBlogInput(input);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ status: "error", errors }, { status: 400 });
  }

  const post = await updateBlogPost(id, input);
  if (!post) {
    return NextResponse.json(
      { status: "error", error: "Blog post not found." },
      { status: 404 }
    );
  }

  return NextResponse.json({ status: "success", post });
}

export async function DELETE(
  _request: Request,
  { params }: RouteContext<"/api/blogs/[id]">
) {
  const { id } = await params;

  const deleted = await deleteBlogPost(id);
  if (!deleted) {
    return NextResponse.json(
      { status: "error", error: "Blog post not found." },
      { status: 404 }
    );
  }

  return NextResponse.json({ status: "success" });
}
