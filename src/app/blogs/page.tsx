import BlogsList from "./blogs-list";

export const metadata = {
  title: "Blog | Jack Ning",
};

export default function Blogs() {
  return (
    <section className="mx-auto w-full max-w-5xl flex-1 px-6 py-24">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
        Blog
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        Thoughts on edge AI wearables, multimodal memory and companion devices,
        crypto, and MBA life — loaded live from the blog API.
      </p>
      <BlogsList />
    </section>
  );
}
