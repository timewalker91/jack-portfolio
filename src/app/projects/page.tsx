import Link from "next/link";
import { projects } from "@/lib/projects";

export const metadata = {
  title: "Projects | Jack Ning",
};

export default function Projects() {
  return (
    <section className="mx-auto w-full max-w-5xl flex-1 px-6 py-24">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
        Projects
      </h1>
      <div className="mt-10 grid gap-6">
        {projects.map(({ slug, title, context, description, tech }) => (
          <Link
            key={slug}
            href={`/projects/${slug}`}
            className="group block rounded-2xl border border-zinc-200 bg-zinc-50 p-6 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-600"
          >
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              {title}
            </h2>
            {context ? (
              <p className="mt-1 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                {context}
              </p>
            ) : null}
            <p className="mt-3 max-w-2xl leading-7 text-zinc-600 dark:text-zinc-400">
              {description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {tech.map((item) => (
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
        ))}
      </div>
    </section>
  );
}
