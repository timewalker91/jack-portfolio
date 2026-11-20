import OwnerGate from "@/components/owner-gate";
import ProjectForm from "./project-form";

export const metadata = {
  title: "Add Project | Jack Ning",
};

export default function AddProject() {
  return (
    <section className="mx-auto w-full max-w-5xl flex-1 px-6 py-24">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
        Add Project
      </h1>
      <OwnerGate>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          Add a project and publish it to the projects page.
        </p>
        <ProjectForm />
      </OwnerGate>
    </section>
  );
}
