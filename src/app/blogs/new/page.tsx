import BlogForm from "./blog-form";

export const metadata = {
  title: "New Post | Jack Ning",
};

export default function NewPost() {
  return (
    <section className="mx-auto w-full max-w-5xl flex-1 px-6 py-24">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
        New Post
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        Write a blog post and publish it to the blog.
      </p>
      <BlogForm />
    </section>
  );
}
