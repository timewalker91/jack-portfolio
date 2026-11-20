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

export type BlogPost = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

function blogDataFile(): string {
  return path.join(process.cwd(), "data", "blog-posts.json");
}

export async function readBlogPosts(): Promise<BlogPost[]> {
  try {
    const parsed: unknown = JSON.parse(
      await fs.readFile(blogDataFile(), "utf8")
    );
    return Array.isArray(parsed) ? (parsed as BlogPost[]) : [];
  } catch {
    return [];
  }
}

export function validateBlogInput(input: BlogInput): BlogErrors {
  const errors: BlogErrors = {};
  if (!input.title) errors.title = "Title can't be empty.";
  if (!input.content) errors.content = "Content can't be empty.";
  return errors;
}

export async function saveBlogPost(input: BlogInput): Promise<BlogPost> {
  const post: BlogPost = {
    id: randomUUID(),
    title: input.title,
    content: input.content,
    createdAt: new Date().toISOString(),
  };

  const posts = await readBlogPosts();
  posts.push(post);

  const dataDir = path.dirname(blogDataFile());
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(
    blogDataFile(),
    JSON.stringify(posts, null, 2) + "\n",
    "utf8"
  );

  return post;
}

export async function updateBlogPost(
  id: string,
  input: BlogInput
): Promise<BlogPost | null> {
  const posts = await readBlogPosts();
  const index = posts.findIndex((post) => post.id === id);
  if (index === -1) return null;

  const updated: BlogPost = { ...posts[index], ...input };
  posts[index] = updated;

  await fs.writeFile(
    blogDataFile(),
    JSON.stringify(posts, null, 2) + "\n",
    "utf8"
  );

  return updated;
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  const posts = await readBlogPosts();
  const remaining = posts.filter((post) => post.id !== id);
  if (remaining.length === posts.length) return false;

  await fs.writeFile(
    blogDataFile(),
    JSON.stringify(remaining, null, 2) + "\n",
    "utf8"
  );
  return true;
}
