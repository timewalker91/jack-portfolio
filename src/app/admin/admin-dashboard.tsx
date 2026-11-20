"use client";

import Link from "next/link";
import { setOwnerMode } from "@/lib/use-owner-mode";

const links = [
  { href: "/admin/blogs", label: "New blog post" },
  { href: "/admin/events", label: "Add or edit events" },
  { href: "/admin/projects", label: "Add a project" },
  { href: "/admin/contacts", label: "Manage contact submissions" },
];

export default function AdminDashboard() {
  return (
    <div className="mt-10 max-w-xl space-y-6">
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Owner mode is on. You can also add, edit, and delete directly on the
        Projects, Blog, and Events pages.
      </p>
      <ul className="grid gap-3">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="block rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-sm font-medium text-zinc-900 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-600"
            >
              {label} →
            </Link>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => setOwnerMode(false)}
        className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
      >
        Owner logout
      </button>
    </div>
  );
}
