import OwnerLink from "@/components/owner-link";
import ProjectsList from "./projects-list";

export const metadata = {
  title: "Projects | Jack Ning",
};

export default function Projects() {
  return (
    <section className="mx-auto w-full max-w-5xl flex-1 px-6 py-24">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
          Projects
        </h1>
        <OwnerLink
          href="/admin/projects"
          className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
        >
          Add project
        </OwnerLink>
      </div>
      <ProjectsList />
    </section>
  );
}
