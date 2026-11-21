"use client";

import Link from "next/link";
import type { BlogPost } from "@/lib/blogs";

function snippet(content: string): string {
  return content.length > 160 ? content.slice(0, 160) + "…" : content;
}

export default function BlogCard({
  post,
  onEdit,
  onDelete,
}: {
  post: BlogPost;
  onEdit: (post: BlogPost) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <li className="rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
      <Link
        href={`/blogs/${post.id}`}
        className="group block p-6 transition-colors hover:border-zinc-400 dark:hover:border-zinc-600"
      >
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          {post.title}
        </h2>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          {new Date(post.createdAt).toLocaleString()}
        </p>
        <p className="mt-3 leading-7 text-zinc-600 dark:text-zinc-400">
          {snippet(post.content)}
        </p>
        <p className="mt-4 text-sm font-medium text-zinc-900 group-hover:underline dark:text-zinc-100">
          Read more →
        </p>
      </Link>
      <div className="flex gap-2 border-t border-zinc-200 px-6 py-3 dark:border-zinc-800">
        <button
          type="button"
          onClick={() => onEdit(post)}
          className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(post.id)}
          className="text-sm font-medium text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
