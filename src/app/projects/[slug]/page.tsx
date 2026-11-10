import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return {
    title: project ? `${project.title} | Jack Ning` : "Projects | Jack Ning",
  };
}

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) {
    notFound();
  }

  return (
    <section className="mx-auto w-full max-w-3xl flex-1 px-6 py-24">
      <Link
        href="/projects"
        className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        ← All projects
      </Link>
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
        {project.title}
      </h1>
      {project.context ? (
        <p className="mt-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {project.context}
        </p>
      ) : null}
      <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        {project.description}
      </p>

      <h2 className="mt-10 text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
        Tech
      </h2>
      <ul className="mt-4 flex flex-wrap gap-2">
        {project.tech.map((item) => (
          <li
            key={item}
            className="rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-sm font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
