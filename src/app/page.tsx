import Link from "next/link";

const interests = [
  "Edge AI Wearables",
  "Multimodal Memory & Companion Devices",
  "Crypto Investment",
  "Business Development",
];

export default function Home() {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-6 py-24">
      <p className="text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
        Hello, I&apos;m
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900 sm:text-6xl dark:text-zinc-50">
        Jack (Kunjun) Ning
      </h1>
      <p className="mt-4 text-xl font-medium text-zinc-700 sm:text-2xl dark:text-zinc-300">
        STEM MBA candidate in Silicon Valley
      </p>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        I bring 7 years of pre-MBA experience in crypto investment and business
        development, and I&apos;m now focused on the intersection of consumer
        hardware and AI — exploring edge AI wearables and multimodal
        memory/companion devices that make technology feel more personal.
      </p>

      <ul className="mt-8 flex flex-wrap gap-2">
        {interests.map((interest) => (
          <li
            key={interest}
            className="rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-sm font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
          >
            {interest}
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/projects"
          className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          View my projects
        </Link>
        <Link
          href="/contact"
          className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
        >
          Get in touch
        </Link>
      </div>
    </section>
  );
}
