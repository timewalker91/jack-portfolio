"use client";

import Link from "next/link";
import type { Project } from "@/lib/projects";

export default function ProjectCard({
  project,
  onEdit,
  onDelete,
}: {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
      <Link
        href={`/projects/${project.slug}`}
        className="group block p-6 transition-colors hover:border-zinc-400 dark:hover:border-zinc-600"
      >
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          {project.title}
        </h2>
        {project.context ? (
          <p className="mt-1 text-sm font-medium text-zinc-500 dark:text-zinc-400">
            {project.context}
          </p>
        ) : null}
        <p className="mt-3 max-w-2xl leading-7 text-zinc-600 dark:text-zinc-400">
          {project.summary}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((item) => (
            <span
              key={item}
              className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            >
              {item}
            </span>
          ))}
        </div>
        <p className="mt-4 text-sm font-medium text-zinc-900 group-hover:underline dark:text-zinc-100">
          View details →
        </p>
      </Link>
      <div className="flex gap-2 border-t border-zinc-200 px-6 py-3 dark:border-zinc-800">
        <button
          type="button"
          onClick={() => onEdit(project)}
          className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(project.id)}
          className="text-sm font-medium text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
