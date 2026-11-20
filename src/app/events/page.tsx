import Link from "next/link";
import EventsList from "./events-list";

export const metadata = {
  title: "Events | Jack Ning",
};

export default function Events() {
  return (
    <section className="mx-auto w-full max-w-5xl flex-1 px-6 py-24">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
          Events
        </h1>
        <Link
          href="/admin/events"
          className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
        >
          Edit events
        </Link>
      </div>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        Industry events, conferences, and hackathons I&apos;ve attended — and
        what I took away from each.
      </p>
      <EventsList />
    </section>
  );
}
