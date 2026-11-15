import { NextResponse } from "next/server";
import { readBlogPosts, saveBlogPost, validateBlogInput } from "@/lib/blogs";

export async function GET() {
  const posts = await readBlogPosts();
  return NextResponse.json({ posts });
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

  const title = typeof data.title === "string" ? data.title.trim() : "";
  const content = typeof data.content === "string" ? data.content.trim() : "";

  const errors = validateBlogInput({ title, content });

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ status: "error", errors }, { status: 400 });
  }

  const post = await saveBlogPost({ title, content });

  return NextResponse.json({ status: "success", post }, { status: 201 });
}
