"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { BlogPost } from "@/lib/blogs";

function snippet(content: string): string {
  return content.length > 160 ? content.slice(0, 160) + "…" : content;
}

const inputClass =
  "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100";

type EditValues = { title: string; content: string };
type EditErrors = { title?: string; content?: string };

export default function BlogsList() {
  const [posts, setPosts] = useState<BlogPost[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [values, setValues] = useState<EditValues>({
    title: "",
    content: "",
  });
  const [errors, setErrors] = useState<EditErrors>({});

  useEffect(() => {
    let cancelled = false;
    const load = () => {
      fetch("/api/blogs", { cache: "no-store" })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to load posts");
          return res.json();
        })
        .then((data: { posts: BlogPost[] }) => {
          if (!cancelled) setPosts(data.posts);
        })
        .catch(() => {
          if (!cancelled) setFailed(true);
        });
    };
    const timer = window.setTimeout(load, 0);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  function load() {
    fetch("/api/blogs", { cache: "no-store" })
      .then((res) => res.json())
      .then((data: { posts: BlogPost[] }) => setPosts(data.posts))
      .catch(() => setFailed(true));
  }

  function startEdit(post: BlogPost) {
    setEditingId(post.id);
    setValues({ title: post.title, content: post.content });
    setErrors({});
  }

  async function saveEdit() {
    if (!editingId) return;
    const res = await fetch(`/api/blogs/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    if (res.ok) {
      setEditingId(null);
      load();
    } else {
      setErrors(data.errors ?? {});
    }
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this blog post?")) return;
    const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
    if (res.ok) load();
  }

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
      {posts.map((post) =>
        editingId === post.id ? (
          <li
            key={post.id}
            className="grid gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div>
              <label
                htmlFor="edit-post-title"
                className="mb-1.5 block text-sm font-medium text-zinc-900 dark:text-zinc-100"
              >
                Title
              </label>
              <input
                id="edit-post-title"
                value={values.title}
                onChange={(e) =>
                  setValues({ ...values, title: e.target.value })
                }
                className={inputClass}
              />
              {errors.title ? (
                <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                  {errors.title}
                </p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="edit-post-content"
                className="mb-1.5 block text-sm font-medium text-zinc-900 dark:text-zinc-100"
              >
                Content
              </label>
              <textarea
                id="edit-post-content"
                rows={8}
                value={values.content}
                onChange={(e) =>
                  setValues({ ...values, content: e.target.value })
                }
                className={inputClass}
              />
              {errors.content ? (
                <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                  {errors.content}
                </p>
              ) : null}
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={saveEdit}
                className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
              >
                Save changes
              </button>
              <button
                type="button"
                onClick={() => setEditingId(null)}
                className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                Cancel
              </button>
            </div>
          </li>
        ) : (
          <li
            key={post.id}
            className="rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900"
          >
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
                onClick={() => startEdit(post)}
                className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => remove(post.id)}
                className="text-sm font-medium text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
              >
                Delete
              </button>
            </div>
          </li>
        )
      )}
    </ul>
  );
}
