import Link from "next/link";
import EventsAdmin from "./events-admin";

export const metadata = {
  title: "Events Admin | Jack Ning",
};

export default function EventsAdminPage() {
  return (
    <section className="mx-auto w-full max-w-5xl flex-1 px-6 py-24">
      <Link
        href="/events"
        className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        ← All events
      </Link>
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
        Events Admin
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        Add an event you attended, or edit an existing one.
      </p>
      <div className="mt-12">
        <EventsAdmin />
      </div>
    </section>
  );
}
