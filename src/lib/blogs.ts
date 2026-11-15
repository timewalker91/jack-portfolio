import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";

export type BlogErrors = {
  title?: string;
  content?: string;
};

export type BlogInput = {
  title: string;
  content: string;
};

export function validateBlogInput(input: BlogInput): BlogErrors {
  const errors: BlogErrors = {};
  if (!input.title) errors.title = "Title can't be empty.";
  if (!input.content) errors.content = "Content can't be empty.";
  return errors;
}

export async function saveBlogPost(input: BlogInput): Promise<void> {
  const post = {
    id: randomUUID(),
    title: input.title,
    content: input.content,
    createdAt: new Date().toISOString(),
  };

  const dataDir = path.join(process.cwd(), "data");
  const dataFile = path.join(dataDir, "blog-posts.json");

  await fs.mkdir(dataDir, { recursive: true });

  let posts: unknown[] = [];
  try {
    const parsed: unknown = JSON.parse(await fs.readFile(dataFile, "utf8"));
    if (Array.isArray(parsed)) posts = parsed;
  } catch {
    posts = [];
  }

  posts.push(post);
  await fs.writeFile(dataFile, JSON.stringify(posts, null, 2) + "\n", "utf8");
}
