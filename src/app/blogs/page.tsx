import OwnerLink from "@/components/owner-link";
import BlogsList from "./blogs-list";

export const metadata = {
  title: "Blog | Jack Ning",
};

export default function Blogs() {
  return (
    <section className="mx-auto w-full max-w-5xl flex-1 px-6 py-24">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
          Blog
        </h1>
        <OwnerLink
          href="/admin/blogs"
          className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
        >
          New Post
        </OwnerLink>
      </div>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        Thoughts on edge AI wearables, multimodal memory and companion devices,
        crypto, and MBA life — loaded live from the blog API.
      </p>
      <BlogsList />
    </section>
  );
}
