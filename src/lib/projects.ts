import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";

export type ProjectFeature = {
  title: string;
  detail: string;
};

export type ProjectErrors = {
  slug?: string;
  title?: string;
  summary?: string;
  overview?: string;
};

export type ProjectInput = {
  slug: string;
  title: string;
  context: string;
  summary: string;
  overview: string;
  tech: string[];
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  context: string;
  summary: string;
  overview: string;
  features: ProjectFeature[];
  tech: string[];
  createdAt: string;
};

function projectsDataFile(): string {
  return path.join(process.cwd(), "data", "projects.json");
}

export async function readProjects(): Promise<Project[]> {
  try {
    const parsed: unknown = JSON.parse(
      await fs.readFile(projectsDataFile(), "utf8")
    );
    return Array.isArray(parsed) ? (parsed as Project[]) : [];
  } catch {
    return [];
  }
}

function isValidSlug(value: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function uniqueSlug(title: string): Promise<string> {
  const base = slugify(title) || "project";
  let slug = base;
  let counter = 2;
  while (await slugTaken(slug)) {
    slug = `${base}-${counter}`;
    counter += 1;
  }
  return slug;
}

export function validateProjectInput(input: ProjectInput): ProjectErrors {
  const errors: ProjectErrors = {};
  if (!input.slug) {
    errors.slug = "Slug can't be empty.";
  } else if (!isValidSlug(input.slug)) {
    errors.slug = "Slug must be lowercase letters, numbers, and dashes.";
  }
  if (!input.title) errors.title = "Title can't be empty.";
  if (!input.summary) errors.summary = "Summary can't be empty.";
  if (!input.overview) errors.overview = "Overview can't be empty.";
  return errors;
}

export async function slugTaken(
  slug: string,
  exceptId?: string
): Promise<boolean> {
  const projects = await readProjects();
  return projects.some((p) => p.slug === slug && p.id !== exceptId);
}

export async function saveProject(input: ProjectInput): Promise<Project> {
  const project: Project = {
    id: randomUUID(),
    ...input,
    features: [],
    createdAt: new Date().toISOString(),
  };

  const projects = await readProjects();
  projects.push(project);

  const dataDir = path.dirname(projectsDataFile());
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(
    projectsDataFile(),
    JSON.stringify(projects, null, 2) + "\n",
    "utf8"
  );

  return project;
}

export async function updateProject(
  id: string,
  input: ProjectInput
): Promise<Project | null> {
  const projects = await readProjects();
  const index = projects.findIndex((project) => project.id === id);
  if (index === -1) return null;

  const updated: Project = { ...projects[index], ...input };
  projects[index] = updated;

  await fs.writeFile(
    projectsDataFile(),
    JSON.stringify(projects, null, 2) + "\n",
    "utf8"
  );

  return updated;
}

export async function deleteProject(id: string): Promise<boolean> {
  const projects = await readProjects();
  const remaining = projects.filter((project) => project.id !== id);
  if (remaining.length === projects.length) return false;

  await fs.writeFile(
    projectsDataFile(),
    JSON.stringify(remaining, null, 2) + "\n",
    "utf8"
  );
  return true;
}
