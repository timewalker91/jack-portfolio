"use client";

import { useEffect, useState } from "react";
import ProjectCard from "@/components/project-card";
import type { Project } from "@/lib/projects";

type EditValues = {
  slug: string;
  title: string;
  context: string;
  summary: string;
  overview: string;
  tech: string;
};

type EditErrors = {
  slug?: string;
  title?: string;
  summary?: string;
  overview?: string;
};

const inputClass =
  "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100";

export default function ProjectsList() {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [values, setValues] = useState<EditValues>({
    slug: "",
    title: "",
    context: "",
    summary: "",
    overview: "",
    tech: "",
  });
  const [errors, setErrors] = useState<EditErrors>({});

  useEffect(() => {
    let cancelled = false;
    const load = () => {
      fetch("/api/projects", { cache: "no-store" })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to load projects");
          return res.json();
        })
        .then((data: { projects: Project[] }) => {
          if (!cancelled) setProjects(data.projects);
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
    fetch("/api/projects", { cache: "no-store" })
      .then((res) => res.json())
      .then((data: { projects: Project[] }) => setProjects(data.projects))
      .catch(() => setFailed(true));
  }

  function startEdit(project: Project) {
    setEditingId(project.id);
    setValues({
      slug: project.slug,
      title: project.title,
      context: project.context,
      summary: project.summary,
      overview: project.overview,
      tech: project.tech.join(", "),
    });
    setErrors({});
  }

  async function saveEdit() {
    if (!editingId) return;
    const res = await fetch(`/api/projects/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...values,
        tech: values.tech
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      }),
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
    if (!window.confirm("Delete this project?")) return;
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (res.ok) load();
  }

  if (failed) {
    return (
      <p className="mt-10 text-sm text-red-600 dark:text-red-400">
        Couldn&apos;t load projects. Please try again later.
      </p>
    );
  }

  if (projects === null) {
    return <p className="mt-10 text-sm text-zinc-500">Loading projects…</p>;
  }

  if (projects.length === 0) {
    return (
      <p className="mt-10 text-zinc-600 dark:text-zinc-400">
        No projects yet — check back soon.
      </p>
    );
  }

  return (
    <div className="mt-10 grid gap-6">
      {projects.map((project) =>
        editingId === project.id ? (
          <div
            key={project.id}
            className="grid gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div>
              <label
                htmlFor="edit-slug"
                className="mb-1.5 block text-sm font-medium text-zinc-900 dark:text-zinc-100"
              >
                Slug
              </label>
              <input
                id="edit-slug"
                value={values.slug}
                onChange={(e) =>
                  setValues({ ...values, slug: e.target.value })
                }
                className={inputClass}
              />
              {errors.slug ? (
                <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                  {errors.slug}
                </p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="edit-title"
                className="mb-1.5 block text-sm font-medium text-zinc-900 dark:text-zinc-100"
              >
                Title
              </label>
              <input
                id="edit-title"
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
                htmlFor="edit-context"
                className="mb-1.5 block text-sm font-medium text-zinc-900 dark:text-zinc-100"
              >
                Context (optional)
              </label>
              <input
                id="edit-context"
                value={values.context}
                onChange={(e) =>
                  setValues({ ...values, context: e.target.value })
                }
                className={inputClass}
              />
            </div>
            <div>
              <label
                htmlFor="edit-summary"
                className="mb-1.5 block text-sm font-medium text-zinc-900 dark:text-zinc-100"
              >
                Summary
              </label>
              <textarea
                id="edit-summary"
                rows={2}
                value={values.summary}
                onChange={(e) =>
                  setValues({ ...values, summary: e.target.value })
                }
                className={inputClass}
              />
              {errors.summary ? (
                <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                  {errors.summary}
                </p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="edit-overview"
                className="mb-1.5 block text-sm font-medium text-zinc-900 dark:text-zinc-100"
              >
                Overview
              </label>
              <textarea
                id="edit-overview"
                rows={4}
                value={values.overview}
                onChange={(e) =>
                  setValues({ ...values, overview: e.target.value })
                }
                className={inputClass}
              />
              {errors.overview ? (
                <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                  {errors.overview}
                </p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="edit-tech"
                className="mb-1.5 block text-sm font-medium text-zinc-900 dark:text-zinc-100"
              >
                Tech (comma-separated)
              </label>
              <input
                id="edit-tech"
                value={values.tech}
                onChange={(e) =>
                  setValues({ ...values, tech: e.target.value })
                }
                className={inputClass}
              />
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
          </div>
        ) : (
          <ProjectCard
            key={project.id}
            project={project}
            onEdit={startEdit}
            onDelete={remove}
          />
        )
      )}
    </div>
  );
}
