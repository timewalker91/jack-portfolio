"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { BlogPost } from "@/lib/blogs";

function snippet(content: string): string {
  return content.length > 160 ? content.slice(0, 160) + "…" : content;
}

export default function BlogsList() {
  const [posts, setPosts] = useState<BlogPost[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetch("/api/blogs", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load posts");
        return res.json();
      })
      .then((data: { posts: BlogPost[] }) => setPosts(data.posts))
      .catch(() => setFailed(true));
  }, []);

  if (failed) {
    return (
      <p className="mt-10 text-sm text-red-600 dark:text-red-400">
        Couldn&apos;t load blog posts. Please try again later.
      </p>
    );
  }

  if (posts === null) {
    return <p className="mt-10 text-sm text-zinc-500">Loading posts…</p>;
  }

  if (posts.length === 0) {
    return (
      <p className="mt-10 text-zinc-600 dark:text-zinc-400">
        No posts yet — check back soon.
      </p>
    );
  }

  return (
    <ul className="mt-10 grid gap-6">
      {posts.map((post) => (
        <li key={post.id}>
          <Link
            href={`/blogs/${post.id}`}
            className="group block rounded-2xl border border-zinc-200 bg-zinc-50 p-6 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-600"
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
        </li>
      ))}
    </ul>
  );
}
